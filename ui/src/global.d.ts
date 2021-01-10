declare const ReactDOM: any, L2Dwidget: any
type StyleType = import('react').CSSProperties
declare namespace abcd {
	interface _ComponentType {
		style?: StyleType
	}
	type ComponentType = React.ComponentType<
		_ComponentType & { [name: string]: any }
	>
}
// declare const antd: {
// 	message: {
// 		success: (text: string) => void,
// 		info: (text: string) => void,
// 		warning: (text: string) => void,
// 		error: (text: string) => void
// 	},
// 	Layout: abcd.ComponentType & {
// 		[name: string]: abcd.ComponentType
// 	},
// 	List: abcd.ComponentType & {
// 		Item: abcd.ComponentType
// 	},
// 	Radio: abcd.ComponentType & {
// 		Group: abcd.ComponentType,
// 		Button: abcd.ComponentType
// 	},
// 	Select: abcd.ComponentType & {
// 		Option: abcd.ComponentType
// 	}
// } & {
// 	[name: string]: abcd.ComponentType
// }
declare const icons: any