import { memo } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@components/Form";

interface PostModificationFormButtonUnPublishedProps {
  isSubmitting: boolean;
  onSaveAndPublish: () => Promise<void>;
  onSubmit: () => Promise<void>;
}

const PostModificationFormButtonUnPublished = ({
  isSubmitting,
  onSaveAndPublish,
  onSubmit,
}: PostModificationFormButtonUnPublishedProps) => {
  const { t } = useTranslation();

  return (
    <>
      <Button
        className="block"
        color="light"
        disabled={isSubmitting}
        isLoading={isSubmitting}
        type="button"
        onClick={onSaveAndPublish}
      >
        {t("saveAndPublish")}
      </Button>
      <Button
        className="block flex-1"
        disabled={isSubmitting}
        isLoading={isSubmitting}
        type="submit"
        onClick={onSubmit}
      >
        {t("save")}
      </Button>
    </>
  );
};

export default memo(PostModificationFormButtonUnPublished);
