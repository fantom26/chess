import { Button, Form, Typography } from "@components/shared";
import { ButtonVariant, FORM_FIELDS, TagVariant } from "@utils/enums";
import { WelcomeFormSchema, welcomeFormResolver } from "@utils/validation";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

export const WelcomeForm = () => {
  const methods = useForm<WelcomeFormSchema>({
    resolver: welcomeFormResolver
  });

  const { t } = useTranslation();

  const { handleSubmit } = methods;

  const startGame = (data: WelcomeFormSchema) => {
    console.log(data);
  };

  return (
    <div className="home__form-wrapper">
      <Typography tag={TagVariant.H1} variant={TagVariant.H2} center={true}>
        {t("home.onlineGameTitle")}
      </Typography>
      <Form classes="home__form" methods={methods} onSubmit={handleSubmit(startGame)}>
        <Form.Input type="text" placeholder={t("placeholders.gameId")} name={FORM_FIELDS.ROOM_ID} />
        <Button variant={ButtonVariant.outlined} type="submit">
          {t("pages.home.createGame")}
        </Button>
      </Form>
    </div>
  );
};
