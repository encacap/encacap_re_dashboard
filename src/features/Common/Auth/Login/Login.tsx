import { yupResolver } from '@hookform/resolvers/yup';
import { useLayoutEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { AuthService } from '../../../../app/Services';
import { AuthLoginFormDataType } from '../../../../app/Types/Common/authTypes';
import { AxiosErrorType } from '../../../../app/Types/Common/commonTypes';
import { Button, Input } from '../../Components/Form';
import { Logo } from '../../Components/Logo';
import { setDocumentTitle } from '../../Utils/helpers';
import { authLoginFormSchema } from '../Schemas/authLoginFormSchema';

const Login = () => {
  const { t } = useTranslation('common', {
    keyPrefix: 'pages.auth.pages.login',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { control, handleSubmit: useFormSubmit } = useForm<AuthLoginFormDataType>({
    resolver: yupResolver(authLoginFormSchema(t)),
  });

  const handleSubmit = useFormSubmit((data) => {
    console.log('Submit');
    setIsSubmitting(true);
    AuthService.loginWithEmailAndPassword(data.email, data.password)
      .then(() => {
        console.log(data);
      })
      .catch((error: AxiosErrorType) => {
        // TODO: Need implement error handling
        console.log(error.response?.data.error);
      });
  });

  useLayoutEffect(() => {
    setDocumentTitle(t('title'));
  });

  return (
    <div className="flex min-h-screen py-10">
      <div className="m-auto h-fit w-120 rounded-xl border-2 border-gray-100 px-14 py-16">
        <div className="flex flex-col items-center justify-center">
          <Logo className="w-16" />
          <div className="mt-10 text-center">
            <div className="text-2xl font-semibold">{t('welcomeBack')}</div>
            <div className="mt-2 text-sm text-gray-500">{t('loginToContinue')}</div>
          </div>
        </div>
        <form className="mt-12 grid gap-6" onSubmit={handleSubmit}>
          <Input
            name="email"
            className="block"
            placeholder={t('form.email.placeholder') ?? ''}
            control={control}
            disabled={isSubmitting}
          />
          <Input
            type="password"
            name="password"
            className="block"
            placeholder={t('form.password.placeholder') ?? ''}
            control={control}
            disabled={isSubmitting}
          />
          <Button type="submit" disabled={isSubmitting} isLoading={isSubmitting}>
            {t('form.submit')}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;