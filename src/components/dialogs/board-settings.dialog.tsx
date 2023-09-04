import { FC } from "react";

import { Modal } from "../common";
import { useModalContext } from "@/hooks/use-modal-context";
import { FORM_FIELDS, MODALS } from "@/utils/enums";
import { useForm } from "react-hook-form";
import { Form } from "../form";
import { MCollections } from "@/utils/mock/collections.mock";
import { useChessContext } from "@/hooks";
import { SettingsStageSchema, settingsResolver } from "@/utils/validation";
import { MBoardColors } from "@/utils/mock/board-colors.mock";

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
      [FORM_FIELDS.PEACE_THEME]: chessStore[FORM_FIELDS.PEACE_THEME],
      [FORM_FIELDS.BOARD_THEME]: chessStore[FORM_FIELDS.BOARD_THEME]
    }
  });

  const { handleSubmit } = methods;

  const updateSettings = (data: SettingsStageSchema) => {
    setChessStore((prev) => ({ ...prev, ...data }));
  };

  return (
    <Modal
      width={61}
      visible={modalStore[MODALS.CHESS_SETTINGS]}
      onClose={generateModalHandlers(MODALS.CHESS_SETTINGS).close}
      bodyClassName={className ? `modal-chess-settings ${className}` : "modal-chess-settings"}
    >
      <Form methods={methods} onSubmit={handleSubmit(updateSettings)}>
        <Form.Select name={FORM_FIELDS.PEACE_THEME} options={MCollections} />
        <Form.Select name={FORM_FIELDS.BOARD_THEME} options={MBoardColors} />
        <button type="submit">Save</button>
      </Form>
    </Modal>
  );
};
