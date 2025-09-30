# 表单提交设置指南

## 🚀 使用Google Sheets接收表单数据（5分钟设置）

### 步骤1: 创建Google Sheets

1. 访问 [Google Sheets](https://sheets.google.com)
2. 创建新的电子表格，命名为 "NLink Waiting List"
3. 在第一行添加表头：
   - A1: `Timestamp`
   - B1: `Name`
   - C1: `Email`
   - D1: `Location`
   - E1: `Role`
   - F1: `Hope`
   - G1: `Newsletter`

### 步骤2: 创建Google Apps Script

1. 在Google Sheets中，点击 **扩展程序 → Apps Script**
2. 删除默认代码，粘贴以下代码：

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    // 添加新行数据
    sheet.appendRow([
      data.timestamp || new Date(),
      data.name || '',
      data.email || '',
      data.location || '',
      data.role || '',
      data.hope || '',
      data.newsletter ? 'Yes' : 'No'
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'success'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch(error) {
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'error',
      'message': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. 点击 **部署 → 新部署**
4. 选择类型：**网页应用**
5. 设置：
   - 执行身份：**我**
   - 访问权限：**任何人**
6. 点击 **部署**
7. **复制Web应用URL** - 这就是你的表单提交地址！

### 步骤3: 更新代码

打开 `src/components/DownloadPage.jsx`，找到第56行：

```javascript
const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_SCRIPT_URL';
```

替换为你刚才复制的URL：

```javascript
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
```

### 步骤4: 测试

1. 刷新你的网站
2. 填写表单并提交
3. 查看Google Sheets，数据应该已经保存了！

---

## 📊 查看提交的数据

直接打开你的Google Sheets文档，所有提交的数据都会按时间顺序排列。你可以：

- ✅ 导出为Excel或CSV
- ✅ 创建图表和数据分析
- ✅ 设置邮件通知（有新提交时收到邮件）
- ✅ 与团队成员共享

---

## 🔄 其他简单方案

### 方案2: Formspree（发送到邮箱）

1. 访问 [Formspree.io](https://formspree.io)
2. 免费注册
3. 创建新表单，获取endpoint URL
4. 修改表单的action和method：

```jsx
<form 
  className="download-form" 
  action="https://formspree.io/f/YOUR_FORM_ID"
  method="POST"
>
```

### 方案3: Netlify Forms（如果部署在Netlify）

在form标签上添加 `netlify` 属性：

```jsx
<form className="download-form" netlify>
```

---

## ⚠️ 重要提示

1. **隐私保护**：确保Google Sheets的访问权限设置正确
2. **数据验证**：当前代码已包含基本验证，可根据需要加强
3. **垃圾邮件防护**：考虑添加reCAPTCHA防止机器人提交

---

## 💡 推荐使用Google Sheets方案

**为什么？**
- ✅ 完全免费
- ✅ 实时查看数据
- ✅ 易于管理和导出
- ✅ 可以设置自动化工作流
- ✅ 不需要额外的后端服务器

有问题随时问我！🚀
