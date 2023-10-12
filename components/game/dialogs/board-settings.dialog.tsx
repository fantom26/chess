"use client";
import { FC } from "react";

import { Modal } from "components/shared/modal";
import { useModalContext, useChessContext } from "@hooks";
import { BOARD_COLORS, ButtonVariant, COLLECTIONS, FORM_FIELDS, MODALS, TagVariant } from "@utils/enums";
import { useForm } from "react-hook-form";
import { Button, Flex, Form, Typography } from "@components/shared";
import { SettingsStageSchema, settingsResolver } from "@utils/validation";
import { generateSelectOptions } from "@helpers";
import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";

export const ChessSettingsModal: FC = () => {
  const { locale } = useParams();
  const { t } = useTranslation(locale);
  const { modalStore, generateModalHandlers } = useModalContext();
  const { chessStore, setChessStore } = useChessContext();

  const methods = useForm<SettingsStageSchema>({
    resolver: settingsResolver,
    defaultValues: {
      [FORM_FIELDS.PEACE_THEME]: chessStore[FORM_FIELDS.PEACE_THEME],
      [FORM_FIELDS.BOARD_THEME]: chessStore[FORM_FIELDS.BOARD_THEME],
      [FORM_FIELDS.HIGHLIGHT_MOVE]: chessStore[FORM_FIELDS.HIGHLIGHT_MOVE]
    }
  });

  const { handleSubmit } = methods;

  const updateSettings = (data: SettingsStageSchema) => {
    setChessStore((prev) => ({ ...prev, ...data }));
    generateModalHandlers(MODALS.CHESS_SETTINGS).close();
  };

  return (
    <Modal
      width={45}
      visible={modalStore[MODALS.CHESS_SETTINGS]}
      onClose={generateModalHandlers(MODALS.CHESS_SETTINGS).close}
      bodyClassName="modal-chess-settings"
    >
      <Form methods={methods} onSubmit={handleSubmit(updateSettings)}>
        <Form.Select name={FORM_FIELDS.PEACE_THEME} options={generateSelectOptions(COLLECTIONS)} />
        <Form.Select name={FORM_FIELDS.BOARD_THEME} options={generateSelectOptions(BOARD_COLORS)} />
        <Flex className="modal-chess-settings__switch" alignItems="center" justifyContent="space-between" container>
          <Typography tag={TagVariant.H3} variant={TagVariant.PARAGRAPH}>
            {t("modals.settings.highlight_moves")}
          </Typography>
          <Form.Switch name={FORM_FIELDS.HIGHLIGHT_MOVE} />
        </Flex>
        <div className="modal__actions">
          <Button variant={ButtonVariant.outlined} type="button" onClick={generateModalHandlers(MODALS.CHESS_SETTINGS).close}>
            {t("btn.cancel")}
          </Button>
          <Button variant={ButtonVariant.contained} type="submit">
            {t("btn.save")}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};
