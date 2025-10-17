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
    :param url: endpoint
    :param file_path: 本地文件路径
    :param file_name: 上传时的文件名
    :return: 响应的 JSON 或文本
    """
    full_url = f"{url}?name={file_name}"
    with open(file_path, "rb") as f:
        file_data = f.read()

    response = requests.put(full_url, data=file_data)
    response.raise_for_status()  # 抛出异常（如果请求失败）

    return response.text


if __name__ == "__main__":
    res = upload_file(
        file_path="test.mp4",
        file_name="test.mp4"
    )
    print(f"上传成功: {res}")
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