import torch
import torch.onnx
from model import CARN
model = CARN(group=4)
model.load_state_dict(torch.load(
    './carn-m-d2-30.pt', map_location='cpu'))
dummy_input = torch.zeros((1, 3, 250, 250))
torch.onnx.export(model, dummy_input, 'carn-m-d2-30.onnx', export_params=True, do_constant_folding=True, opset_version=11,
                  input_names=['input'],
                  output_names=['output'],
                  dynamic_axes={
                      'input': {
                          0: 'batch_size',
                          2: 'width',
                          3: 'height'
                      },
                      'output': {
                          0: 'batch_size',
                          2: 'width',
                          3: 'height'
                      }
                  })
