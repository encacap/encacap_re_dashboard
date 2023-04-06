import dayjs from 'dayjs';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AiOutlineEyeInvisible } from 'react-icons/ai';
import { FiTrash2, FiUpload } from 'react-icons/fi';
import { HiDotsHorizontal } from 'react-icons/hi';
import { MdAccessTime } from 'react-icons/md';
import striptags from 'striptags';

import { DROPDOWN_MENU_TYPE_ENUM } from '@constants/enums';
import { EstateDataType } from '@interfaces/Admin/estateTypes';

import DropdownContainerV2 from '@components/Dropdown/DropdownContainerV2';
import { DropdownMenuItemType } from '@components/Dropdown/DropdownContainerV2MenuItem';
import { Button } from '@components/Form';
import LoadingSpinner from '@components/Loading/LoadingSpinner';

import useToast from '@hooks/useToast';
import { getImageURL } from '@utils/helpers';

import AdminEstateListTableBodyItemBadge from './TableBodyItemBadge';

interface AdminEstateListTableBodyItemProps {
  data: EstateDataType;
  onClickDelete?: (id: number) => void;
  onMoveToTop?: (id: number) => Promise<void>;
  onClickUnPublish?: (id: number) => void;
  onInteraction?: () => void;
}

const AdminEstateListTableBodyItem = ({
  data,
  onClickDelete,
  onMoveToTop,
  onClickUnPublish,
  onInteraction,
}: AdminEstateListTableBodyItemProps) => {
  const { t } = useTranslation('admin', {
    keyPrefix: 'admin:page.estate.list',
  });
  const { t: tEstate } = useTranslation('admin', {
    keyPrefix: 'admin:page.estate',
  });
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(false);

  const handleClickDelete = useCallback(() => {
    onClickDelete?.(data.id);
  }, [data, onClickDelete]);

  const handleClickMoveToTop = useCallback(async () => {
    setIsLoading(true);

    try {
      await onMoveToTop?.(data.id);
      toast.success(t('notification.movedToTop'));
      onInteraction?.();
    } catch (error) {
      toast.error(t('notification.moveToTopFailed'));
    } finally {
      setIsLoading(false);
    }
  }, [data, onClickDelete]);

  const handleClickUnPublish = useCallback(() => {
    onClickUnPublish?.(data.id);
  }, [data, onClickUnPublish]);

  const dropdownMenu = useMemo<DropdownMenuItemType[]>(
    () => [
      {
        icon: <FiUpload />,
        id: 'moveToTop',
        label: t('table.action.moveToTop'),
        onClick: handleClickMoveToTop,
      },
      {
        icon: <AiOutlineEyeInvisible />,
        id: 'unPublish',
        label: t('table.action.unPublish'),
        onClick: handleClickUnPublish,
      },
      { id: 'divider', type: DROPDOWN_MENU_TYPE_ENUM.DIVIDER },
      {
        className: 'text-red-500',
        icon: <FiTrash2 />,
        id: 'delete',
        label: t('table.action.delete'),
        onClick: handleClickDelete,
      },
    ],
    [handleClickDelete],
  );

  return (
    <div className="relative overflow-hidden rounded-lg">
      {isLoading && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-white bg-opacity-50" />
      )}
      <div className="aspect-video w-full">
        <img src={getImageURL(data.avatar)} alt={data.title} className="h-full w-full object-cover" />
      </div>
      <div className="rounded-b-lg border-2 border-t-0 border-gray-100 px-4 py-4">
        <div className="mb-2 flex items-center justify-start space-x-2">
          {isLoading && <LoadingSpinner className="h-5 w-5 border-teal-500" />}
          <AdminEstateListTableBodyItemBadge status={data.status}>
            {tEstate(`status.${data.status}`)}
          </AdminEstateListTableBodyItemBadge>
          {data.customId && (
            <AdminEstateListTableBodyItemBadge>#{data.customId}</AdminEstateListTableBodyItemBadge>
          )}
          <AdminEstateListTableBodyItemBadge>{data.category.name}</AdminEstateListTableBodyItemBadge>
        </div>
        <div>
          <div className="font-semibold">{data.title}</div>
          <div className="mt-1 flex items-center justify-start space-x-2">
            <MdAccessTime />
            <span className="text-sm">
              {t('table.column.updatedAt', {
                date: dayjs(data.updatedAt).format('DD/MM/YYYY'),
              })}
            </span>
          </div>
        </div>
        <div
          dangerouslySetInnerHTML={{
            __html: striptags(data.description),
          }}
          className="mt-3 mb-2.5 overflow-hidden border-t-2 border-gray-100 pt-2 line-clamp-3"
        />
        <div className="flex items-center space-x-4 border-t-2 border-gray-100 pt-4">
          <DropdownContainerV2 menu={dropdownMenu}>
            <Button className="rounded-sm py-2.5" color="light" size="sm" disabled={isLoading}>
              <HiDotsHorizontal size={20} />
            </Button>
          </DropdownContainerV2>
          <Button className="flex-1 rounded-sm" size="sm" disabled={isLoading}>
            {t('table.action.edit')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminEstateListTableBodyItem;
