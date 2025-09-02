#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 開始 Vercel 自定義構建...');
console.log('📁 當前目錄:', process.cwd());
console.log('📦 Node.js 版本:', process.version);

try {
  // 檢查 package.json
  const packagePath = path.join(process.cwd(), 'package.json');
  if (fs.existsSync(packagePath)) {
    console.log('✅ package.json 存在');
    const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    console.log('📋 項目名稱:', packageJson.name);
    console.log('📋 構建腳本:', packageJson.scripts?.build);
  }

  // 安裝依賴
  console.log('📦 安裝依賴...');
  execSync('npm install', { stdio: 'inherit' });
  
  // 構建項目
  console.log('🔨 執行構建...');
  execSync('npm run build', { stdio: 'inherit' });
  
  console.log('✅ 構建成功完成！');
  process.exit(0);
} catch (error) {
  console.error('❌ 構建失敗:', error.message);
  console.error('❌ 錯誤詳情:', error);
  process.exit(1);
}
