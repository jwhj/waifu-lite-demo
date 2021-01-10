import time
from io import BytesIO, StringIO
from multiprocessing import Pool
import torch
import torch.nn as nn
import torchvision as tv
from model import SkipFSRCNN_ms
from flask import Flask, request, send_file
from PIL import Image
from typing import Dict
device = 'cuda'
model: Dict[str, nn.Module] = {}
model['SkipFSRCNN-MS H'] = SkipFSRCNN_ms()
model['SkipFSRCNN-MS H'].load_state_dict(torch.load(
    './model-SkipFSRCNN-ms-h.pt', map_location='cpu'))
model['SkipFSRCNN-MS N'] = SkipFSRCNN_ms()
model['SkipFSRCNN-MS N'].load_state_dict(torch.load(
    './model-SkipFSRCNN-ms-n.pt', map_location='cpu'))
for name in model:
    model[name].to(device)
    model[name].eval()


def inference(model, im):
    t1 = tv.transforms.ToTensor()(im).to(device)
    c, w, h = t1.size()
    if c == 4:
        t1 = t1[:3, :, :]
    with torch.no_grad():
        start = time.time()
        print('inference starts')
        t2: torch.Tensor = model(t1.unsqueeze(0))
        print(f'inference takes {time.time()-start}')
    t2.squeeze_(0)
    t2.clamp_(0, 1)
    return tv.transforms.ToPILImage()(t2.cpu())


app = Flask(__name__)


@app.route('/')
def index():
    return send_file('./index.html')


@app.route('/sr', methods=['POST'])
def sr():
    file = request.files.get('file')
    im = Image.open(file.stream)
    model_ = model[request.form.get('model')]
    # im1 = pool.apply(inference, args=(model_, im))
    im1 = inference(model_, im)
    img_io = BytesIO()
    im1.save(img_io, 'PNG')
    img_io.seek(0)
    return send_file(img_io, mimetype='image/png')


if __name__ == '__main__':
    pool = Pool(1)
    app.run(host='0.0.0.0', port=4000)
