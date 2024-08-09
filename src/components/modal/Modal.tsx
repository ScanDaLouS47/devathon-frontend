import styles from './modal.module.scss';

/**
 *
 * @param {Object} props - Propiedades para renderizar el tipo de texto
 * @param {ReactNode} props.children - Este componente acepta el anidamiento de contenido, utilizando dos etiquetas `<Modal></Modal>`
 * @param {(isModalVisible: boolean) => void} props.setIsModalVisible Función para asignar la visibilidad del Modal
 *
 * @returns {JSX.Element} Elemento | Estructura HTML
 */

export const Modal = ({
  children,
  setIsModalVisible,
}: {
  children: React.ReactNode;
  setIsModalVisible: (isModalVisible: boolean) => void;
}): JSX.Element => {
  return (
    <>
      <div className={styles.modal}>
        <div className={styles.modal__container}>
          <div className={styles.modal__content}>{children}</div>
        </div>
        <div className={styles.modal__close} onClick={() => setIsModalVisible(false)}></div>
      </div>
    </>
  );
};
