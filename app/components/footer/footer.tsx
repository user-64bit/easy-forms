import { colors } from "@/app/assets/color";
import AppButton from "../app-button/app-button";
import PublishIcon from "@/public/icons/publish";
import SaveAsDraftIcon from "@/public/icons/save-as-draft";

export default function Footer({
  handleFormPublish,
}: {
  handleFormPublish: () => void;
}) {

  return (
    <div className="flex justify-between px-[24px] py-[16px] border-t">
      <AppButton
        title="Save as Draft"
        IconLeft={SaveAsDraftIcon}
        onClick={() => console.log("Save as Draft")}
      />
      <AppButton
        title="Publish Form"
        IconLeft={PublishIcon}
        borderColor={colors["green-400"]}
        textColor={colors["gray-00"]}
        backgroundColor={colors["green-400"]}
        onClick={handleFormPublish}
      />
    </div>
  );
}
