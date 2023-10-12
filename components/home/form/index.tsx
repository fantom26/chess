import { Button, Form, Typography } from "@components/shared";
import { useTranslation } from "@i18n/client";
import { ButtonVariant, FORM_FIELDS, TagVariant } from "@utils/enums";
import { WelcomeFormSchema, welcomeFormResolver } from "@utils/validation";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";

export const WelcomeForm = () => {
  const { lng } = useParams();

  const methods = useForm<WelcomeFormSchema>({
    resolver: welcomeFormResolver
  });

  const { t } = useTranslation(lng as string, "common");

  const { handleSubmit } = methods;

  const startGame = (data: WelcomeFormSchema) => {
    console.log(data);
  };

  return (
    <div className="home__form-wrapper">
      <Typography tag={TagVariant.H1} variant={TagVariant.H1} center={true}>
        Welcome in chess
      </Typography>
      <Form classes="home__form" methods={methods} onSubmit={handleSubmit(startGame)}>
        <Form.Input type="text" placeholder="Enter gameId" name={FORM_FIELDS.ROOM_ID} />
        <Button variant={ButtonVariant.outlined} type="submit">
          {t("btn.cancel")}
        </Button>
      </Form>
    </div>
  );
};
