import { isRegExp, isDate } from "./is"

describe("HelloWorld", () => {
	it("is - isRegExp", () => {
		const reg = /^5/
		expect(isRegExp(reg)).toBe(true)
	})

	it("is - isDate", () => {
		const time1 = new Date()
		expect(isDate(time1)).toBe(true)
		const time2 = Date.now()
		expect(isDate(time2)).toBe(false)
	})
})
