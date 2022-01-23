<script setup lang="ts">
import { onMounted } from "vue"
import "../Monaco/Monaco"
import * as monaco from "monaco-editor/esm/vs/editor/editor.api"
import { blackTheme } from './theme';

// import "monaco-editor/min/vs/loader.js"
// import "monaco-editor/min/vs/editor/editor.main.nls.js"
// import "monaco-editor/min/vs/editor/editor.main.js"

onMounted(() => {
	monaco.editor.defineTheme("acrmd", blackTheme);
	var editor = monaco.editor.create(document.getElementById("container"), {
		value: ["function x() {", '\tconsole.log("Hello world!");', "}"].join(
			"\n"
		),
		language: "typescript",
		// fontSize: 15,
		// fontFamily: 'Impact',
		fontWeight: 'italic',
		theme: "acrmd",
		padding: {
			top: 18,
			bottom: 18
		}
	})
	editor.onDidChangeModelContent(function (event) {
		//编辑器内容change事件
		console.log(editor.getValue(), event)
	})
})
</script>
<template>
	<div class="app-monaco">
		<div
			id="container"
		></div>
	</div>
</template>

<style lang="scss" scoped>
.app-monaco {
	background-color: $bgColor;
	display: flex;
}

#container {
	width: 100%;
	height: 400px;
	border: 1px solid $borderColor;
	border-radius: 2px;
}
</style>
