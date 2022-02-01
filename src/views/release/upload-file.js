const inputDom = document.querySelector('#input')

const config = {
    headers: { 'Content-Type': 'multipart/form-data' },
}

inputDom.onchange = function (e) {
    const files = Array.from(e?.target?.files || [])
    if (files.length > 0) {
        files.forEach((file) => {
            const formData = new FormData()
            formData.append('file', file)
            axios
                .post('/api/code/upload', formData, config)
                .then(function (result) {
                    return result.data
                })
                .then(function (result) {
                    console.log(result)
                })
                .catch(function (err) {})
        })
    }
}
