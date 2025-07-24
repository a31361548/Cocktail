import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db'; // 假设您的数据库连接逻辑位于 `lib/db/index.ts`
import User from '@/models/User'; // 导入用户模型，假设在`/models`目录下有一个名为`User.ts`的文件
import bcrypt from 'bcryptjs'; // 导入密码哈希库
import jwt from 'jsonwebtoken'; // 导入JWT生成器

// 处理POST请求的登录逻辑
export async function POST(req: NextRequest) {
  await dbConnect(); // 连接数据库
  
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: '電子郵件和密碼是必要的' }, { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: '不合資格的憑證' }, { status: 401 });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return NextResponse.json({ message: '不合資格的憑證' }, { status: 401 });
    }

    // 使用JWT生成token，假设使用 `process.env.JWT_SECRET` 作为密钥
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || '', {
      expiresIn: '1h',
    });

    return NextResponse.json({ token }, { status: 200 });
  } catch (error) {
    console.error(error); // 警告：錯誤信息被輸出到控制台，而不是返回給客戶端
    return NextResponse.json({ message: '內部伺服器錯誤' }, { status: 500 });
  }
}