# DirectLink
免费文件直链解决方案,基于golang,支持http api调用 \
put方法请求 /api/upload?name=文件名,请求体为文件二进制即可 \
release中每个版本都为一条不同的线路,失效后可自行更换其他版本 \
失效后不定时更新，release所有版本均有效,失效后会删除 \
如果使用发现失效可到issue反馈 \
下载: https://github.com/InvertGeek/DirectLink/releases

## python接入例子
```python
import requests


def upload_file(file_path: str, file_name: str, url: str = "http://127.0.0.1:8080/api/upload", ):
    """
    使用 PUT 方法上传文件二进制
    :param url: 填写directlink部署地址+api/upload
    :param file_path: 本地文件路径
    :param file_name: 上传时的文件名
    :return: 响应文件直链
    """
    full_url = f"{url}?name={file_name}"
    with open(file_path, "rb") as f:
        file_data = f.read()

    response = requests.put(full_url, data=file_data)
    response.raise_for_status()  # 抛出异常（如果请求失败）

    return response.text


if __name__ == "__main__":
    print('开始上传')
    res = upload_file(
        file_path="test.mp4",
        file_name="test.mp4"
    )
    print(f"上传成功: {res}")

```

## js接入例子
```javascript
import fs from 'fs';
import fetch from 'node-fetch';

/**
 * 使用 PUT 方法上传文件二进制
 * @param {string} filePath 本地文件路径
 * @param {string} fileName 上传时的文件名
 * @param {string} url 上传接口地址（默认 http://127.0.0.1:8080/api/upload）
 * @returns {Promise<string>} 响应的文件直链
 */
async function uploadFile(filePath, fileName, url = 'http://127.0.0.1:8080/api/upload') {
    const fullUrl = `${url}?name=${encodeURIComponent(fileName)}`;
    const fileData = fs.readFileSync(filePath);

    const response = await fetch(fullUrl, {
        method: 'PUT',
        body: fileData
    });

    if (!response.ok) {
        throw new Error(`上传失败：${response.status} ${response.statusText}`);
    }

    return await response.text();
}

(async () => {
    console.log('开始上传')
    try {
        const res = await uploadFile('test.mp4', 'test.mp4');
        console.log(`上传成功: ${res}`);
    } catch (err) {
        console.error(err);
    }
})();

```

## 源码
前端源码: https://github.com/InvertGeek/directlink-front \
为了避免某些风险不提供后端源码,如果担心有安全隐患可使用虚拟机或docker运行 \
也可以使用安卓端: https://github.com/InvertGeek/FastFile

## 失效问题
推荐搭配: https://github.com/InvertGeek/mixlink 使用 \
可实现失效自动切换备用地址

## 免责声明

+   不能百分百保证文件永久有效,请自行对重要文件做好本地备份。
+   请勿使用本项目上传不符合社会主义核心价值观的文件。
+   可能会收集您上传的文件的统计信息到云端，包括文件url
+   该项目仅用于学习和技术交流，开发者不承担任何由使用者的行为带来的法律责任。

## Github Star

[![Stargazers over time](https://starchart.cc/InvertGeek/directlink.svg?variant=adaptive)](https://starchart.cc/InvertGeek/directlink)