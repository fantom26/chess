"use client";
import { FC } from "react";

import { Modal } from "components/shared/modal";
import { useModalContext } from "@hooks";
import { FORM_FIELDS, MODALS, TagVariant } from "@utils/enums";
import { useForm } from "react-hook-form";
import { Button, Form, Typography } from "@components/shared";
import { JoinGameDefaultValues, JoinGameResolver, JoinGameSchema } from "@utils/validation";
import { useTranslation } from "react-i18next";
import { useParams, useRouter } from "next/navigation";

export const JoinGameModal: FC = () => {
  const { t } = useTranslation();
  const { replace } = useRouter();
  const { locale } = useParams();
  const { modalStore, generateModalHandlers } = useModalContext();

  const methods = useForm<JoinGameSchema>({
    resolver: JoinGameResolver,
    defaultValues: JoinGameDefaultValues
  });

  const { handleSubmit, reset } = methods;

  const joinGame = (data: JoinGameSchema) => {
    const { name, gameId } = data;
    replace(`/${locale}?name=${name}&id=${gameId}`);
    reset();
    generateModalHandlers(MODALS.JOIN_GAME).close();
  };

  return (
    <Modal width={45} visible={modalStore[MODALS.JOIN_GAME]} onClose={generateModalHandlers(MODALS.JOIN_GAME).close} bodyClassName="modal-join-game">
      <Typography tag={TagVariant.H2} variant={TagVariant.H2} center gutterBottom>
        {t("modals.joinGame.title")}
      </Typography>
      <Form methods={methods} onSubmit={handleSubmit(joinGame)}>
        <Form.Input name={FORM_FIELDS.NAME} placeholder={t("placeholders.playerName")} />
        <Form.Input name={FORM_FIELDS.GAME_ID} placeholder={t("placeholders.gameId")} />
        <div className="modal__actions">
          <Button type="submit" aria-label="Play button">{t("btn.play")}</Button>
        </div>
      </Form>
    </Modal>
  );
};
