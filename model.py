import torch
import torch.nn as nn
import torch.nn.functional as F


class MeanShift(nn.Module):
    def __init__(self, mean_rgb, sub):
        super(MeanShift, self).__init__()

        sign = -1 if sub else 1
        r = mean_rgb[0] * sign
        g = mean_rgb[1] * sign
        b = mean_rgb[2] * sign

        self.shifter = nn.Conv2d(3, 3, 1, 1, 0)
        self.shifter.weight.data = torch.eye(3).view(3, 3, 1, 1)
        self.shifter.bias.data = torch.Tensor([r, g, b])

        # Freeze the mean shift layer
        for params in self.shifter.parameters():
            params.requires_grad = False

    def forward(self, x):
        x = self.shifter(x)
        return x


class FSRCNN(nn.Module):
    def __init__(self, d: int = 56, s: int = 12, m: int = 4):
        super(FSRCNN, self).__init__()
        self.feature_extract = nn.Sequential(
            nn.Conv2d(3, d, 5, padding=5//2), nn.PReLU(d))
        self.shrink = nn.Sequential(nn.Conv2d(d, s, 1), nn.PReLU(s))
        maps = []
        for i in range(m):
            maps.extend([nn.Conv2d(s, s, 3, padding=3//2), nn.PReLU(s)])
        self.mapping = nn.Sequential(*maps)
        self.expand = nn.Sequential(nn.Conv2d(s, d, 1), nn.PReLU(d))
        self.deconv = nn.ConvTranspose2d(
            d, 3, 9, padding=9//2, stride=2, output_padding=1)
        # self.PReLU = nn.PReLU(3)

    def forward(self, x):
        x = self.feature_extract(x)
        x = self.shrink(x)
        x = self.mapping(x)
        x = self.expand(x)
        # x = torch.sigmoid(self.expand(x))
        # return torch.sigmoid(self.deconv(x))
        # return self.PReLU(self.deconv(x))
        return self.deconv(x)


class SkipFSRCNN(nn.Module):
    def __init__(self, d: int = 56, s: int = 12, m: int = 4):
        super(SkipFSRCNN, self).__init__()
        self.activate = nn.LeakyReLU()
        self.feature_extract = nn.Conv2d(3, d, 5, padding=5//2)
        self.shrink = nn.Conv2d(d, s, 1)
        maps = []
        for i in range(m):
            maps.extend([nn.Conv2d(s, s, 3, padding=3//2), self.activate])
        self.mapping = nn.Sequential(*maps)
        self.expand = nn.Conv2d(s + 3, d, 1)
        self.deconv = nn.ConvTranspose2d(
            d, 3, 9, padding=9//2, stride=2, output_padding=1)
        # self.PReLU = nn.PReLU(3)

    def forward(self, x0):
        x = self.activate(self.feature_extract(x0))
        x = self.activate(self.shrink(x))
        x = self.mapping(x)
        x = torch.cat((x0, x), 1)
        x = self.activate(self.expand(x))
        # x = torch.sigmoid(self.expand(x))
        # return torch.sigmoid(self.deconv(x))
        # return self.PReLU(self.deconv(x))
        x = self.deconv(x)
        return x


class SkipFSRCNN_ms(nn.Module):
    def __init__(self, d: int = 56, s: int = 12, m: int = 4):
        super(SkipFSRCNN_ms, self).__init__()
        self.add_mean = MeanShift((0.6251, 0.5497, 0.5752), sub=False)
        self.sub_mean = MeanShift((0.6251, 0.5497, 0.5752), sub=True)
        self.activate = nn.LeakyReLU()
        self.feature_extract = nn.Conv2d(3, d, 5, padding=5//2)
        self.shrink = nn.Conv2d(d, s, 1)
        maps = []
        for i in range(m):
            maps.extend([nn.Conv2d(s, s, 3, padding=3//2), self.activate])
        self.mapping = nn.Sequential(*maps)
        self.expand = nn.Conv2d(s + 3, d, 1)
        self.deconv = nn.ConvTranspose2d(
            d, 3, 9, padding=9//2, stride=2, output_padding=1)
        # self.PReLU = nn.PReLU(3)

    def forward(self, x0):
        x0 = self.sub_mean(x0)
        x = self.activate(self.feature_extract(x0))
        x = self.activate(self.shrink(x))
        x = self.mapping(x)
        x = torch.cat((x0, x), 1)
        x = self.activate(self.expand(x))
        # x = torch.sigmoid(self.expand(x))
        # return torch.sigmoid(self.deconv(x))
        # return self.PReLU(self.deconv(x))
        x = self.deconv(x)
        x = self.add_mean(x)
        return x


class TrueSkipFSRCNN(nn.Module):
    def __init__(self, d: int = 56, s: int = 12, m: int = 4):
        super(TrueSkipFSRCNN, self).__init__()
        self.activate = nn.LeakyReLU()
        self.feature_extract = nn.Conv2d(3, d, 5, padding=5//2)
        self.shrink = nn.Conv2d(d, s, 1)
        maps = []
        for i in range(m):
            maps.extend([nn.Conv2d(s, s, 3, padding=3//2), self.activate])
        self.mapping = nn.Sequential(*maps)
        self.expand = nn.Conv2d(s, d, 1)
        self.deconv = nn.ConvTranspose2d(
            d + 3, 3, 9, padding=9//2, stride=2, output_padding=1)
        # self.PReLU = nn.PReLU(3)

    def forward(self, x0):
        x = self.activate(self.feature_extract(x0))
        x = self.activate(self.shrink(x))
        x = self.mapping(x)
        x = self.activate(self.expand(x))
        x = torch.cat((x0, x), 1)
        # x = torch.sigmoid(self.expand(x))
        # return torch.sigmoid(self.deconv(x))
        # return self.PReLU(self.deconv(x))
        return self.deconv(x)


class ResBlock(nn.Module):
    def __init__(self, in_channels: int, out_channels: int, n: int = 2):
        assert(in_channels == out_channels)
        super(ResBlock, self).__init__()
        layers = []
        self.activate = nn.LeakyReLU()
        for i in range(n):
            layers.append(nn.Conv2d(in_channels, out_channels,
                                    kernel_size=3, padding=3//2))
            if i != n-1:
                layers.append(self.activate)
        self.layers = nn.Sequential(*layers)

    def forward(self, x):
        x1 = self.layers(x)
        return self.activate(x+x1)


class ResNet(nn.Module):
    def __init__(self, d: int = 56, s: int = 12, m: int = 4, n: int = 2):
        super(ResNet, self).__init__()
        self.activate = nn.LeakyReLU()
        self.feature_extract = nn.Conv2d(3, d, 5, padding=5//2)
        self.shrink = nn.Conv2d(d, s, 1)
        maps = []
        maps.extend(
            [nn.Conv2d(s, s, kernel_size=3, padding=3//2), self.activate])
        for i in range(m-1):
            maps.extend([ResBlock(s, s, n), self.activate])
        self.mapping = nn.Sequential(*maps)
        self.expand = nn.Conv2d(s+3, d, 1)
        self.deconv = nn.ConvTranspose2d(
            d, 3, 9, padding=9//2, stride=2, output_padding=1)

    def forward(self, x0):
        x = self.activate(self.feature_extract(x0))
        x = self.activate(self.shrink(x))
        x = self.mapping(x)
        x = torch.cat((x, x0), 1)
        x = self.activate(self.expand(x))
        return self.deconv(x)


class SRCNN(nn.Module):
    def __init__(self, f=[9, 1, 5], n=[64, 32]):
        super(SRCNN, self).__init__()
        self.activate = nn.ReLU()
        self.conv0 = nn.Conv2d(3, n[0], f[0], padding=f[0]//2)
        self.conv1 = nn.Conv2d(n[0], n[1], f[1], padding=f[1]//2)
        self.conv2 = nn.Conv2d(n[1], 3, f[2], padding=f[2]//2)

    def forward(self, x):
        x = F.interpolate(x, scale_factor=2, mode='nearest')
        x = self.activate(self.conv0(x))
        x = self.activate(self.conv1(x))
        x = self.activate(self.conv2(x))
        return x


class EResidualBlock(nn.Module):
    def __init__(self, in_channels: int, out_channels: int, group: int = 1):
        super(EResidualBlock, self).__init__()
        self.conv1 = nn.Conv2d(in_channels, out_channels,
                               kernel_size=3, padding=3//2, groups=group)
        self.conv2 = nn.Conv2d(out_channels, out_channels,
                               kernel_size=3, padding=3//2, groups=group)
        self.conv3 = nn.Conv2d(out_channels, out_channels, kernel_size=1)

    def forward(self, x0):
        x = F.relu(self.conv1(x0))
        x = F.relu(self.conv2(x))
        return F.relu(self.conv3(x)+x0)


class CascadingBlock(nn.Module):
    def __init__(self, n: int = 64, group: int = 1):
        super(CascadingBlock, self).__init__()
        self.b1 = EResidualBlock(n, n, group=group)
        self.b2 = EResidualBlock(n, n, group=group)
        self.b3 = EResidualBlock(n, n, group=group)
        self.c1 = nn.Sequential(nn.Conv2d(n*2, n, 1), nn.ReLU())
        self.c2 = nn.Sequential(nn.Conv2d(n*3, n, 1), nn.ReLU())
        self.c3 = nn.Sequential(nn.Conv2d(n*4, n, 1), nn.ReLU())

    def forward(self, x):
        b1 = self.b1(x)
        c1 = torch.cat([x, b1], 1)
        o1 = self.c1(c1)

        b2 = self.b2(o1)
        c2 = torch.cat([c1, b2], 1)
        o2 = self.c2(c2)

        b3 = self.b3(o2)
        c3 = torch.cat([c2, b3], 1)
        o3 = self.c3(c3)
        return o3


class CARN(nn.Module):
    def __init__(self, group: int = 1):
        super(CARN, self).__init__()
        self.add_mean = MeanShift((0.6251, 0.5497, 0.5752), sub=False)
        self.sub_mean = MeanShift((0.6251, 0.5497, 0.5752), sub=True)
        n = 64
        self.entry = nn.Conv2d(3, n, 3, padding=3//2)
        self.b1 = CascadingBlock(n, group=group)
        self.b2 = CascadingBlock(n, group=group)
        self.b3 = CascadingBlock(n, group=group)
        self.c1 = nn.Sequential(nn.Conv2d(n*2, n, 1), nn.ReLU())
        self.c2 = nn.Sequential(nn.Conv2d(n*3, n, 1), nn.ReLU())
        self.c3 = nn.Sequential(nn.Conv2d(n*4, n, 1), nn.ReLU())
        self.upsample = nn.Sequential(
            nn.Conv2d(n, n*4, 3, padding=3//2, groups=group), nn.ReLU(), nn.PixelShuffle(2))
        self.exit = nn.Conv2d(n, 3, 3, padding=3//2)

    def forward(self, x):
        x = self.sub_mean(x)
        x = self.entry(x)

        b1 = self.b1(x)
        c1 = torch.cat([x, b1], 1)
        o1 = self.c1(c1)

        b2 = self.b2(o1)
        c2 = torch.cat([c1, b2], 1)
        o2 = self.c2(c2)

        b3 = self.b3(o2)
        c3 = torch.cat([c2, b3], 1)
        o3 = self.c3(c3)

        out = self.upsample(o3)

        out = self.exit(out)
        out = self.add_mean(out)

        return out
