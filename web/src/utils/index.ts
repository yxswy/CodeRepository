export function flexColumnWidth(
	str: string,
	width: string,
	isReturnNumber: boolean
) {
	if (!str || typeof str !== "string") return "0px"
	let flexWidth = 0
	for (const char of str) {
		if (char >= "A" && char <= "Z") {
			// 如果是英文字符，为字符分配8个单位宽度
			flexWidth += 12
		} else if (char >= "a" && char <= "z") {
			// 如果是中文字符，为字符分配20个单位宽度
			flexWidth += 7
		} else if (char >= "\u4e00" && char <= "\u9fa5") {
			// 如果是中文字符，为字符分配20个单位宽度
			flexWidth += 20
		} else {
			// 其他种类字符，为字符分配5个单位宽度
			flexWidth += 15
		}
	}
	flexWidth = flexWidth + 20
	if (width && flexWidth < parseInt(width)) {
		flexWidth = parseInt(width)
	}
	return isReturnNumber ? flexWidth : flexWidth + "px"
}

//* 后续排版需要维护的部分
export function actionsFlexColumnWidth(actions: any[]) {
	const width = actions.reduce((sum, pre) => {
		sum += flexColumnWidth(pre.name, "0", true)
		return sum
	}, 0)
	return width + "px"
}

// 是否是一个有意义的数组 Array
export function isMeaningfulArray(arr: any[]) {
	return arr && Array.isArray(arr) && arr.length > 0
}

export function isExternal(path: string) {
	return /^(https?:|mailto:|tel:)/.test(path)
}

export * from "./is/is"
export * from "./util"
export * from "./dom"

function injectScript(src) {
	return new Promise((resolve, reject) => {
		const script = document.createElement("script")
		script.src = src
		script.addEventListener("load", resolve)
		script.addEventListener("error", e => reject(e.error))
		document.head.appendChild(script)
	})
}
