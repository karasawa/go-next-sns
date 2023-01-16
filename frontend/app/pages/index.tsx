import { Layout } from '../components/Layout'
import { AuthForm } from '../components/molecules/AuthForm'

export default function Auth() {
  return (
    <>
      <Layout title="auth">
        <AuthForm />
      </Layout>
    </>
  )
}
