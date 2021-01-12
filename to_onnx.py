import torch
import torch.onnx
from model import SkipFSRCNN_ms
# model = CARN(group=4)
model = SkipFSRCNN_ms()
model.load_state_dict(torch.load(
    './SkipFSRCNN-ms-nb.pt', map_location='cpu'))
dummy_input = torch.zeros((1, 3, 250, 250))
torch.onnx.export(model, dummy_input, 'SkipFSRCNN-ms-nb.onnx', export_params=True, do_constant_folding=True, opset_version=11,
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
