import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import AppButton from "../app-button/app-button";
import { setFormTitle } from "@/app/redux/form/formSlice";

export default function Header({
  title,
  previewMode,
  handlePreview,
  renderRightComponent,
}: {
  title?: string;
  previewMode?: boolean;
  handlePreview?: () => void;
  renderRightComponent?: () => React.ReactNode;
}) {
  const formTitle = useAppSelector(
    (state) => state.persistedReducer.data.formTitle
  );
  const dispatch = useAppDispatch();
  return (
    <div className="flex justify-between items-center px-[24px] py-[17px] border-b">
      <input
        className="text-[16px] flex flex-1 mr-[24px] font-semibold placeholder:text-gray-400 text-gray-950 border-0 outline-none"
        placeholder="Untitled form"
        value={title || formTitle}
        maxLength={66}
        onChange={(e) => {
          dispatch(setFormTitle(e.target.value));
        }}
        disabled={previewMode}
      />
      {renderRightComponent ? (
        renderRightComponent()
      ) : (
        <AppButton
          title="Preview"
          iconRight="/icons/preview.png"
          onClick={handlePreview}
        />
      )}
    </div>
  );
}
