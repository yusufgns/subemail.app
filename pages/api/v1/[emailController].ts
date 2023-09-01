import type { NextApiRequest, NextApiResponse } from 'next'
import supabase from '@/utils/supabase'
import NextCors from 'nextjs-cors'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await NextCors(req, res, {
    methods: ['POST'],
    origin: '*',
    optionsSuccessStatus: 200,
  })

  const { emailController } = req.query
  const props = JSON.parse(req.body)
  const { email, projectKey } = props

  if (!email || !projectKey) {
    res.status(400).json({ error: 'Email and projectKey are required' })
    return
  }

  // E-posta ve proje anahtarıyla veritabanında mevcut bir satırı arayın
  const { data: existingRowData, error: existingRowError } = await supabase
    .from('emailList')
    .select('*')
    .eq('email', email)
    .eq('projectKey', projectKey)

  if (existingRowError) {
    res.status(400).json({
      error: `Something went wrong while connecting to Supabase | Error 400`,
    })
    return
  }

  // Eğer aynı e-posta ve aynı proje anahtarı ile bir satır varsa, hata mesajı gönder
  if (existingRowData.length > 0) {
    res.status(400).json({
      error: 'A row with the same email and projectKey combination already exists',
    })
    return
  }

  // Yeni satırı ekleyin
  const { data: newRowData, error: newRowError } = await supabase
    .from('emailList')
    .insert([
      {
        email: email,
        projectKey: projectKey,
        cretorEmailKey: emailController,
      },
    ])

  if (newRowError) {
    res.status(400).json({
      error: `Failed to add the row to the database`,
    })
    return
  }

  return res.status(200).json({ message: `Success : Email successfully added` })
}
