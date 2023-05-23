import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { EstateFormDataType } from "@interfaces/Admin/estateTypes";

import AdminCategorySelector from "@admin/Estate/Components/AdminCategorySelector";

import FormGroupTitle from "../../../../../../Common/Components/Form/GroupTitle";
import AdminEstateModificationFormDetailDescription from "./Description";
import AdminEstateModificationFormDetailPropertyInputGroup from "./PropertyInputGroup";
import AdminEstateModificationFormDetailQuarterSelector from "./QuarterSelector";

const AdminEstateModificationFormDetail = () => {
  const { t } = useTranslation("admin", {
    keyPrefix: "admin:page.estate.modification.form.detail",
  });

  const { control } = useFormContext<EstateFormDataType>();

  return (
    <div className="border-gray-100 pt-6">
      <FormGroupTitle title={t("title")} />
      <div className="mt-5 grid grid-cols-3 gap-6 pt-0.5">
        <AdminCategorySelector control={control} />
        <AdminEstateModificationFormDetailQuarterSelector />
        <AdminEstateModificationFormDetailPropertyInputGroup />
      </div>
      <AdminEstateModificationFormDetailDescription />
    </div>
  );
};

export default AdminEstateModificationFormDetail;
