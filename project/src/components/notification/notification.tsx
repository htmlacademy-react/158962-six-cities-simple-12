import {useAppSelector, useAppDispatch} from '../../hooks';
import {getNotifications, clearNotification} from '../../store/slices/notification-slice/notification-slice';
import {toast, ToastOptions} from 'react-toastify';
import {Notification as INotification} from '../../types/notification';

function Notification(): JSX.Element {
  const notifications = useAppSelector(getNotifications);
  const dispatch = useAppDispatch();

  const renderNotification = () => {
    notifications.forEach((notification: INotification) => {
      const toastOptions: ToastOptions = {
        autoClose: notification.duration || 4000,
        toastId: notification.id,
        onClose: () => dispatch(clearNotification(notification.id)),
      };

      if (toast.isActive(notification.id)) {
        return;
      }

      switch (notification.type) {
        case 'error':
          toast.error(notification.message, toastOptions);
          break;
        case 'success':
          toast.success(notification.message, toastOptions);
          break;
        case 'info':
          toast.info(notification.message, toastOptions);
          break;
        case 'warning':
          toast.warning(notification.message, toastOptions);
          break;
        default:
          return null;
      }
    });
  };

  return <>{renderNotification()}</>;
}

export default Notification;
