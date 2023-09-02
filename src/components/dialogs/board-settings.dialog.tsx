import { FC, ReactNode } from "react";

import { Modal } from "../common";
import { useModalContext } from "@/hooks/use-modal-context";
import { FORM_FIELDS, MODALS } from "@/utils/enums";
import { useForm } from "react-hook-form";
import { Form } from "../form";
import { MCollections } from "@/utils/mock/collections.mock";
import { useChessContext } from "@/hooks";
import { SettingsStageSchema, settingsResolver } from "@/utils/validation";

interface BoardSettingsProps {
  className?: string;
}

export const ChessSettingsModal: FC<BoardSettingsProps> = (props) => {
  const { modalStore, generateModalHandlers } = useModalContext();
  const { chessStore, setChessStore } = useChessContext();
  const { className } = props;

  const methods = useForm<SettingsStageSchema>({
    resolver: settingsResolver,
    defaultValues: {
      [FORM_FIELDS.PEACE_THEME]: chessStore.peaceTheme,
    },
  });

  const { handleSubmit, getValues } = methods;

  const updateSettings = (data: SettingsStageSchema) => {
    console.log("data", data);
    setChessStore(data);
  };

  console.log(getValues());

  return (
    <Modal
      width={61}
      visible={modalStore[MODALS.CHESS_SETTINGS]}
      onClose={generateModalHandlers(MODALS.CHESS_SETTINGS).close}
      bodyClassName={
        className ? `modal-chess-settings ${className}` : "modal-chess-settings"
      }
    >
      <Form methods={methods} onSubmit={handleSubmit(updateSettings)}>
        <Form.Select
          name={FORM_FIELDS.PEACE_THEME}
          options={MCollections}
          defaultValue={chessStore[FORM_FIELDS.PEACE_THEME]}
        />
        <button type="submit">Save</button>
      </Form>
    </Modal>
  );
};
