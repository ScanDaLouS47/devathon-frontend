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
      const resp = await fetchApi(
        '/api/v1/update',
        'PATCH',
        '',
        {
          name: data.name,
          lName: data.lastName,
          email: data.email,
          phone: data.phone,
          image_url: 'None',
        },
        false,
      );

      if (!resp) {
        throw new Error('Bad request');
      }

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
            <img
              className="image-perfil"
              src="https://pub-static.fotor.com/assets/projects/pages/d5bdd0513a0740a8a38752dbc32586d0/fotor-03d1a91a0cec4542927f53c87e0599f6.jpg"
              alt=""
            />
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

            <button className="form__btn" type="submit" aria-label="Save">
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
