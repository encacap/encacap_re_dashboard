import { ESTATE_STATUS_ENUM, IEstate, IPost, getImageURL } from "@encacap-group/common/dist/re";
import dayjs from "dayjs";
import { decode } from "html-entities";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiEdit2, FiTrash2, FiUpload } from "react-icons/fi";
import { HiDotsHorizontal } from "react-icons/hi";
import { MdAccessTime } from "react-icons/md";
import striptags from "striptags";
import { twMerge } from "tailwind-merge";

import DropdownContainerV2 from "@components/Dropdown/DropdownContainerV2";
import { DropdownMenuItemType } from "@components/Dropdown/DropdownContainerV2MenuItem";
import { Button } from "@components/Form";
import { DROPDOWN_MENU_TYPE_ENUM } from "@constants/enums";
import useToast from "@hooks/useToast";
import { EstateDraftDataType } from "@interfaces/Admin/estateTypes";
import { PostDraftDataType } from "@interfaces/Admin/postTypes";

import PostTableBodyItemBadge from "./TableBodyItemBadge";

interface PostTableBodyItemProps {
  data: IEstate | EstateDraftDataType | IPost | PostDraftDataType;
  onClickDelete?: (id: number) => void;
  onMoveToTop?: (id: number) => Promise<void>;
  onClickUnPublish?: (id: number) => void;
  onClickPublish?: (id: number) => void;
  onInteraction?: () => void;
  onClickEdit: (data: IEstate | EstateDraftDataType | IPost | PostDraftDataType) => void;
}

const PostTableBodyItem = ({
  data,
  onClickDelete,
  onMoveToTop,
  onClickUnPublish,
  onClickPublish,
  onInteraction,
  onClickEdit,
}: PostTableBodyItemProps) => {
  const { t } = useTranslation();
  const { t: tEstate } = useTranslation("admin", {
    keyPrefix: "admin:page.estate",
  });
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(false);

  const content = useMemo(() => {
    if ("content" in data && data.content) {
      return decode(striptags(data.content)).trim();
    }

    if ("description" in data && data.description) {
      return decode(striptags(data.description).trim());
    }

    return null;
  }, [data, t]);

  const handleClickDelete = useCallback(() => {
    onClickDelete?.(data.id);
  }, [data, onClickDelete]);

  const handleClickEdit = useCallback(() => {
    onClickEdit(data);
  }, [data, onClickEdit]);

  const handleClickMoveToTop = useCallback(async () => {
    setIsLoading(true);

    try {
      await onMoveToTop?.(data.id);
      toast.success(t("moveToTopSuccess"));
      onInteraction?.();
    } catch (error) {
      toast.error(t("moveToTopError"));
    } finally {
      setIsLoading(false);
    }
  }, [data, onClickDelete]);

  const handleClickUnPublish = useCallback(() => {
    onClickUnPublish?.(data.id);
  }, [data, onClickUnPublish]);

  const handleClickPublish = useCallback(() => {
    onClickPublish?.(data.id);
  }, [data, onClickPublish]);

  const moveTopTopOption: DropdownMenuItemType = useMemo(
    () => ({
      icon: <FiUpload />,
      id: "moveToTop",
      label: t("moveToTop"),
      onClick: handleClickMoveToTop,
    }),
    [handleClickMoveToTop],
  );

  const editOption: DropdownMenuItemType = useMemo(
    () => ({
      icon: <FiEdit2 />,
      id: "edit",
      label: t("edit"),
      onClick: handleClickEdit,
    }),
    [handleClickEdit],
  );

  const deleteOption: DropdownMenuItemType = useMemo(
    () => ({
      className: "text-red-500",
      icon: <FiTrash2 />,
      id: "delete",
      label: t("delete"),
      onClick: handleClickDelete,
    }),
    [handleClickDelete],
  );

  const dropdownMenu = useMemo<DropdownMenuItemType[]>(() => {
    if (data.status === ESTATE_STATUS_ENUM.UNPUBLISHED) {
      return [editOption, { id: "divider", type: DROPDOWN_MENU_TYPE_ENUM.DIVIDER }, deleteOption];
    }

    if (data.status === ESTATE_STATUS_ENUM.DRAFT) {
      return [deleteOption];
    }

    return [
      moveTopTopOption,
      editOption,
      { id: "divider", type: DROPDOWN_MENU_TYPE_ENUM.DIVIDER },
      deleteOption,
    ];
  }, [handleClickDelete]);

  return (
    <div className="relative flex flex-col overflow-hidden rounded-lg">
      {isLoading && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-white bg-opacity-50" />
      )}
      <div className="aspect-video w-full flex-shrink-0 overflow-hidden bg-gray-100">
        {data.avatar && (
          <img
            src={getImageURL(data.avatar)}
            alt={data.title}
            className="h-full w-full object-cover object-center"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col rounded-b-lg border-2 border-t-0 border-gray-100 px-4 py-4">
        <div className="flex flex-wrap items-center justify-start">
          <PostTableBodyItemBadge status={data.status} title={tEstate(`status.${String(data.status)}`)} />
          {"customId" in data && data.customId && <PostTableBodyItemBadge title={`#${data.customId}`} />}
          {data.category && <PostTableBodyItemBadge title={data.category.name} />}
        </div>
        <div>
          <div className="font-semibold">{data.title}</div>
          <div className="mt-1 flex items-center justify-start space-x-2">
            <MdAccessTime />
            <span className="text-sm">
              {t("updatedAtDate", {
                date: dayjs(data.updatedAt).format("DD/MM/YYYY"),
              })}
            </span>
          </div>
        </div>
        <div
          className={twMerge(
            "flex-1 overflow-hidden border-gray-100 line-clamp-3",
            content && "mt-3 border-t-2 pt-2",
          )}
        >
          {content}
        </div>
        <div className="mt-3 flex items-center space-x-4 border-t-2 border-gray-100 pt-4">
          <DropdownContainerV2 menu={dropdownMenu}>
            <Button className="rounded-sm py-2.5" color="light" size="sm" disabled={isLoading}>
              <HiDotsHorizontal size={20} />
            </Button>
          </DropdownContainerV2>
          {data.status === ESTATE_STATUS_ENUM.UNPUBLISHED && (
            <Button className="flex-1 rounded-sm" size="sm" disabled={isLoading} onClick={handleClickPublish}>
              {t("publish")}
            </Button>
          )}
          {data.status === ESTATE_STATUS_ENUM.DRAFT && (
            <Button className="flex-1 rounded-sm" size="sm" disabled={isLoading} onClick={handleClickEdit}>
              {t("edit")}
            </Button>
          )}
          {data.status === ESTATE_STATUS_ENUM.PUBLISHED && (
            <Button
              className="flex-1 rounded-sm"
              size="sm"
              disabled={isLoading}
              onClick={handleClickUnPublish}
            >
              {t("unPublish")}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostTableBodyItem;
