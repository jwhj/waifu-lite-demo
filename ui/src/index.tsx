import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import {
	message,
	Layout,
	Row, Col,
	Select,
	Upload,
	Button,
	Divider
} from 'antd'
const { Option } = Select
const { Header, Content, Footer } = Layout
const App = () => {
	const [offset, setOffset] = useState(document.documentElement.clientWidth < 700 ? 1 : 8)
	const [model, setModel] = useState('SkipFSRCNN-MS N')
	const [url, setUrl] = useState<string>()
	const [fileList, setFileList] = useState<any[]>()
	const lock = useRef(false)
	useEffect(() => {
		addEventListener('resize', () => {
			setOffset(document.documentElement.clientWidth < 700 ? 1 : 8)
		})
	}, [])
	const submit = () => {
		if (!fileList) {
			message.warning('请先选择一张图片')
			return
		}
		if (lock.current) {
			message.warning('请不要频繁提交')
			return
		}
		lock.current = true
		const formData = new FormData()
		formData.append('model', model)
		formData.append('file', fileList[0])
		message.info('在做了在做了')
		axios.post('/sr', formData, {
			responseType: 'blob'
		}).then(result => {
			if (url) {
				URL.revokeObjectURL(url)
			}
			// console.log(result.data)
			const url_ = URL.createObjectURL(result.data)
			console.log(url_)
			message.success('我好了')
			setUrl(url_)
			lock.current = false
		}).catch(err => {
			lock.current = false
			const reader = new FileReader()
			reader.readAsText(err.response.data)
			reader.onloadend = () => {
				message.error(reader.result as string)
			}
		})
	}
	return (
		<Layout style={{ minHeight: '100%' }}>
			<Header>
				<h1 style={{
					color: 'white'
				}}>
					我们的demo
				</h1>
			</Header>
			<Content>
				<Row>
					<Col offset={offset} span={24 - offset - offset}>
						<div style={{
							display: 'flex',
							alignItems: 'center',
							marginTop: 10
						}}>
							<div>选择模型：</div>
							<Select value={model}
								onChange={(value: string) => {
									console.log(value)
									setModel(value)
								}}
								style={{
									display: 'inline-block',
									flexGrow: 1
								}}>
								<Option value="SkipFSRCNN-MS H">SkipFSRCNN-MS H</Option>
								<Option value="SkipFSRCNN-MS N">SkipFSRCNN-MS N</Option>
								<Option value="CARN-M">CARN-M</Option>
							</Select>
						</div>
						<div style={{
							marginTop: 10,
							marginBottom: 10
						}}>
							选择图片：
							<Upload beforeUpload={(file: any) => {
								console.log(file)
								setFileList([file])
								return false
							}} fileList={fileList}>
								<Button>上传</Button>
							</Upload>
						</div>
						{/* <Input type="file" name="file" /> */}
						{/* <input type="file" id="file" name="file" /> */}
						{/* <button type="submit">submit</button> */}
						<Button block type="primary" onClick={submit}>提交！</Button>
						<Divider>好！很有精神！</Divider>
						{url && (
							<a href={url} target="_blank">
								<img src={url} style={{ width: '100%' }} />
							</a>
						)}
					</Col>
				</Row>
			</Content>
			<Footer>请爱护服务器~</Footer>
		</Layout >
	)
}
ReactDOM.render(
	<App />,
	document.querySelector('#app')
)