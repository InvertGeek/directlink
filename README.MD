# DirectLink

DirectLink 是一个 **免费的直链网盘项目**，支持 **文件直链** 与 **临时文件分享**，  
可用于图片、视频、文档等文件的快速上传与分享。

项目支持通过 **HTTP API** 进行调用：

- 使用 `PUT` 方法请求 `/api/upload?name=文件名`
- 请求体直接传输文件二进制数据
- 接口返回可直接访问的文件直链

---

## 线路与版本说明

- Release 中的 **每个版本均为独立线路**
- 当某一线路失效时，可自行切换至其他版本
- 失效线路会不定期更新，确认失效后将被删除
- 如使用中发现失效，可通过 Issue 反馈

---

## 相关链接

- **Telegram 群**：https://t.me/ivgeek  
- **DEMO 站点**（Cloudflare 限制最大 100MB，推荐自行部署）：  
  https://www.dlink666.com/  
- **下载地址（Releases）**：  
  https://github.com/InvertGeek/DirectLink/releases  

---

## 部署教程

### 1. 下载与运行
Release 中提供的均为**已编译好的二进制文件**，下载后可直接运行。

- **darwin**：macOS 版本，下载后直接执行即可  
- **linux**：首次运行前需要赋予执行权限：
  
  chmod 777 文件名
  
  运行方式：
  
  ./文件名

### 2. 后台运行 / 服务化（Linux）
如需在后台运行，或配置为系统服务，可自行使用 `nohup`、`screen`、`tmux`，或创建 `systemd` 服务。  
不熟悉的情况下，也可以直接询问 AI 获取具体配置方式。

### 3. Cookie 获取教程
Cookie 获取方法可参考以下教程：  
https://blog.csdn.net/qq_64542714/article/details/135738112


---

## Python 接入示例

```python
import requests


def upload_file(file_path: str, file_name: str, url: str = "http://127.0.0.1:8080/api/upload"):
    """
    使用 PUT 方法上传文件二进制
    :param url: directlink 部署地址 + /api/upload
    :param file_path: 本地文件路径
    :param file_name: 上传时的文件名
    :return: 返回文件直链
    """
    with open(file_path, "rb") as f:
        file_data = f.read()

    response = requests.put(url, data=file_data, params={"name": file_name})
    response.raise_for_status()

    return response.text


if __name__ == "__main__":
    print("开始上传")
    res = upload_file(
        file_path="test.mp4",
        file_name="test.mp4"
    )
    print(f"上传成功: {res}")
```

---

## JavaScript 接入示例（Node.js）

```javascript
import fs from 'fs';
import fetch from 'node-fetch';

/**
 * 使用 PUT 方法上传文件二进制
 * @param {string} filePath 本地文件路径
 * @param {string} fileName 上传时的文件名
 * @param {string} url 上传接口地址
 * @returns {Promise<string>} 文件直链
 */
async function uploadFile(
  filePath,
  fileName,
  url = 'http://127.0.0.1:8080/api/upload'
) {
  const fullUrl = `${url}?name=${encodeURIComponent(fileName)}`;
  const fileData = fs.readFileSync(filePath);

  const response = await fetch(fullUrl, {
    method: 'PUT',
    body: fileData
  });

  if (!response.ok) {
    throw new Error(`上传失败: ${response.status} ${response.statusText}`);
  }

  return await response.text();
}

(async () => {
  console.log('开始上传');
  try {
    const res = await uploadFile('test.mp4', 'test.mp4');
    console.log(`上传成功: ${res}`);
  } catch (err) {
    console.error(err);
  }
})();
```

---

## 安卓客户端 
https://github.com/InvertGeek/FastFile

---

## 失效自动处理

推荐搭配以下项目使用：

- https://github.com/InvertGeek/mixlink

可实现当直链失效时自动切换备用地址，提高可用性。

---

## 免责声明

- 无法保证文件永久有效，请务必对重要文件进行本地备份  
- 请勿上传不符合社会主义核心价值观的内容  
- 可能会收集上传文件的部分统计信息（如文件 URL）  
- 本项目仅用于学习与技术交流，因使用本项目而产生的任何法律责任由使用者自行承担  

---

## GitHub Star

[![Stargazers over time](https://starchart.cc/InvertGeek/directlink.svg?variant=adaptive)](https://starchart.cc/InvertGeek/directlink)
