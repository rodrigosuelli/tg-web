'use client';

import { CgSpinner } from 'react-icons/cg';
import { useState } from 'react';
import Link from 'next/link';
import { useUser } from '@/contexts/userContext';
import withAuthRoute from '@/hoc/withAuthRoute';
import InputPassword from '../../components/InputPassword/InputPassword';

function Login() {
  const [isSendingForm, setIsSendingForm] = useState(false);

  const { logIn } = useUser();

  async function handleLogin(e) {
    e.preventDefault();
    setIsSendingForm(true);

    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    const { email, password } = formJson;

    await logIn(email, password);

    setIsSendingForm(false);
  }

  return (
    <form onSubmit={handleLogin} className="authForm">
      <h1>Bem-vindo de volta!</h1>
      <p>Efetue o login para ter uma melhor experiência.</p>
      <label htmlFor="email">Email:</label>
      <input
        className="inputDefault"
        required
        minLength={6}
        autoComplete="email"
        type="email"
        name="email"
        id="email"
        placeholder="Insira seu email..."
      />
      <label htmlFor="password">Senha:</label>
      <InputPassword
        autoComplete="current-password"
        placeholder="Senha"
        name="password"
        id="password"
      />
      <Link href="/esqueci-senha" className="textLink">
        Esqueceu a senha?
      </Link>
      <button
        disabled={isSendingForm}
        className="btnPrimary btnEnterAuth"
        type="submit"
      >
        {isSendingForm ? <CgSpinner size={26} /> : 'Login'}
      </button>
      <p className="paragraphWithLink">
        Não possui uma conta?&nbsp;
        <Link href="/cadastro" className="textLink">
          Crie Uma
        </Link>
      </p>
    </form>
  );
}

export default withAuthRoute(Login);
