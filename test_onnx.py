import torchvision as tv
import torch
from PIL import Image
import onnxruntime
import numpy as np
import time
import gc


def to_numpy(tensor: torch.Tensor):
    return tensor.detach().cpu().numpy() if tensor.requires_grad else tensor.cpu().numpy()


def main():
    ort_session = onnxruntime.InferenceSession("SkipFSRCNN-ms-h.onnx")
    im = Image.open('C:\\Users\\jwhj/Pictures/w.jpg')
    w, h = im.size
    # im = im.resize((w//2, h//2), Image.BICUBIC)
    t1 = tv.transforms.ToTensor()(im)
    t1.unsqueeze_(0)
    ort_inputs = {ort_session.get_inputs()[0].name: to_numpy(t1)}
    start = time.time()
    ort_outs = ort_session.run(None, ort_inputs)
    print(f'inference takes {time.time()-start}')
    img_out_y = ort_outs[0]
    img_out_y = Image.fromarray(
        np.uint8(img_out_y.clip(0, 1).squeeze(0)*255).transpose([1, 2, 0]))
    img_out_y.show()


if __name__ == '__main__':
    main()
    gc.collect()
    time.sleep(1000)
