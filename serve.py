import time
from io import BytesIO
import tempfile
import onnxruntime
import numpy as np
import threading
from flask import Flask, request, send_file
from PIL import Image
import argparse
import os
from typing import Dict
parser = argparse.ArgumentParser()
parser.add_argument('-d', action='store_true', help='enable debug mode')
args = parser.parse_args()


class ModelLoader:
    def __init__(self):
        self.model_file: Dict[str, onnxruntime.InferenceSession] = {}
        self.model_file['SkipFSRCNN-MS B'] = './SkipFSRCNN-ms-b.onnx'
        self.model_file['SkipFSRCNN-MS N'] = './SkipFSRCNN-ms-n.onnx'
        self.model_file['SkipFSRCNN-MS N+B'] = './SkipFSRCNN-ms-nb.onnx'
        self.model_file['CARN-M'] = './carn-m-d2-30.onnx'

    def new_session(self, model_name: str) -> onnxruntime.InferenceSession:
        if not (model_name in self.model_file):
            raise f'model {model_name} not found'
        model_file = self.model_file[model_name]
        return onnxruntime.InferenceSession(model_file)


model_loader = ModelLoader()


def patched_inference(model: onnxruntime.InferenceSession, im: Image.Image):
    patch_size = 500
    t1 = np.array(im.convert('RGB'), dtype=np.float32)
    w, h, c = t1.shape
    if c > 3:
        t1 = t1[:, :, :3]
    t1 = t1.transpose([2, 0, 1])/255
    t1 = np.expand_dims(t1, 0)
    t2 = np.zeros((1, 3, w*2, h*2))
    with lock:
        for i in range(0, w, patch_size):
            for j in range(0, h, patch_size):
                i0 = min(w, i+patch_size)
                j0 = min(h, j+patch_size)
                ort_inputs = {model.get_inputs()[0].name: t1[:, :, i:i0, j:j0]}
                print('inference starts')
                start = time.time()
                ort_outputs = model.run(None, ort_inputs)
                print(f'inference takes {time.time()-start}')
                t2[:, :, i*2:i0*2, j*2:j0*2] = ort_outputs[0]
    im1 = Image.fromarray(
        np.uint8(t2.clip(0, 1).squeeze(0)*255).transpose([1, 2, 0]))
    return im1


def inference(model: onnxruntime.InferenceSession, im: Image.Image):
    t1 = np.array(im.convert('RGB'), dtype=np.float32)
    _, _, c = t1.shape
    if c > 3:
        t1 = t1[:, :, :3]
    t1 = t1.transpose([2, 0, 1])/255
    t1 = np.expand_dims(t1, 0)
    ort_inputs = {model.get_inputs()[0].name: t1}
    with lock:
        print('inference starts')
        start = time.time()
        ort_outputs = model.run(None, ort_inputs)
        print(f'inference takes {time.time()-start}')
    t2: np.array = ort_outputs[0]
    im1 = Image.fromarray(
        np.uint8(t2.clip(0, 1).squeeze(0)*255).transpose([1, 2, 0]))
    return im1


app = Flask(__name__, static_folder='./ui/public', static_url_path='/')


@app.after_request
def a(r):
    try:
        r.headers.pop('Expires')
        r.headers['Cache-Control'] = 'no-cache'
    except Exception:
        pass
    return r


@app.route('/')
def index():
    return app.send_static_file('index.html')


@app.route('/sr', methods=['POST'])
def sr():
    file = request.files.get('file')
    im = Image.open(file.stream)
    w, h = im.size
    if w*h > 6e6:
        print('这么大放进去会死的啦')
        return '您太大啦', 500
    model = model_loader.new_session(request.form.get('model'))
    im1 = patched_inference(model, im)
    img_io = BytesIO()
    im1.save(img_io, 'PNG')
    img_io.seek(0)
    return send_file(img_io, mimetype='image/png', cache_timeout=0)
    # tmp_file = tempfile.TemporaryFile()
    # print('compressing to PNG')
    # im1.save(tmp_file, 'PNG', compress_level=3)
    # print('compression completed')
    # tmp_file.seek(0)
    # return send_file(tmp_file, mimetype='image/png')


if args.d:
    @app.route('/bundle.js')
    def bundle():
        start = time.time()
        os.system(
            'esbuild --bundle --sourcemap ui/src/index.tsx --outfile=ui/public/bundle.js')
        print(f'bundle emitted in {time.time()-start}')
        return app.send_static_file('bundle.js')


if __name__ == '__main__':
    lock = threading.Lock()
    app.run(host='0.0.0.0', port=4000)
