import { FormInput } from "../../../components/formInput/FormInput";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { registerSchema, RegisterType } from "../../../auth/pages/register/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { fetchApi } from "../../../utils/fetchApi";
import FormInputPhone from "../../../components/formInputPhone/FormInputPhone";
import { options } from "../../../data/options";

export const PerfilPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterType>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
  });  

  const [registerError, setRegisterError] = useState<string | null>(null);

  const handleRegister: SubmitHandler<RegisterType> = async (data) => {
    try {
      // const { data: authData, error } = await client.auth.signUp({
      //   email: data.email,
      //   password: data.password,
      //   options: {
      //     data: {
      //       name: data.name,
      //       lastName: data.lastName,
      //       phone: data.phone,
      //     },
      //   },
      // });
      // console.log('ON SUPABASE', authData);
      // console.log('SUP_ID', authData.user?.user_metadata.sub);

      const resp = await fetchApi(
        '/api/v1/update',
        'PATCH',
        '',
        {
          name: data.name,
          lName: data.lastName,
          email: data.email,
          phone: data.phone,
          // password: authData.user?.user_metadata.sub,
          // password: '123456Aa#',
          image_url: 'None',
        },
        false,
      );
      console.log('ON MY BACKEND', resp);

      // if (error) {
      //   throw new Error(error.message);
      // }

      // if (!authData.user) {
      //   throw new Error('No user data received');
      // }

      if (!resp) {
        throw new Error('Bad request');
      }

      // TODO: Mostrar un mensaje mediante un toast o algo por el estilo
    } catch (error) {
      if (error instanceof Error) {
        setRegisterError(error.message);
        console.error('Registration error:', error.message);
      } else {
        setRegisterError('An unexpected error occurred');
        console.error('Unexpected error:', error);
      }
    }
  };
  return (    
    <div className="content">        
        <div className="register wrapper">
      <div className="register__container">  
        <div className="image-container">
          <img className="image-perfil" src="https://pub-static.fotor.com/assets/projects/pages/d5bdd0513a0740a8a38752dbc32586d0/fotor-03d1a91a0cec4542927f53c87e0599f6.jpg" alt="" />
        </div>      
        {registerError && <div className="error-message">{registerError}</div>}

        <form className="form" onSubmit={handleSubmit(handleRegister)}>
          <FormInput
            label="Name"
            error={errors['name']}
            id="name"
            type="text"
            placeholder="John"
            autoFocus
            {...register('name')}
          />

          <FormInput
            label="Last Name"
            error={errors['lastName']}
            id="lastName"
            type="text"
            placeholder="Doe"
            {...register('lastName')}
          />

          <FormInputPhone
            options={options}
            label={'Phone Number'}
            error={errors['phone']}
            register={register('phone', {
              setValueAs: (value) => `${options[0].countryTag ? `+${options[0].countryTag}` : ''}${value}`,
            })}
          />

          <FormInput
            label="Email Address"
            error={errors['email']}
            id="email"
            type="email"
            placeholder="bob@mail.com"
            {...register('email')}
          />

          <button className="form__btn" type="submit">
            Guardar
          </button>
        </form>
      </div>
    </div>
    </div>
  )
}
