import { useNavigate, useParams } from 'react-router-dom';
import Input from 'react-phone-number-input/input';
import { useState, useEffect, useRef } from 'react';
import donut from '../../images/donut.svg';
import cl from './delivery-modal.module.scss';

// const OrderContent = ({ goBack, isDeliveryCheckbox }) => {
//   return (
//     <div className={cl['delivery__completed']}>
//       <div className={cl['delivery__content-header']}>
//         <h3 className={cl['delivery__content-header-title']}>
//           Спасибо за заказ!
//         </h3>
//         <button
//           onClick={goBack}
//           className={cl['delivery__content-header-close']}
//         />
//       </div>
//       <p>
//         Мы рады, что вы выбрали нас. Надеемся, что ваш заказ принесет вам
//         удовольствие и наслаждение. Если у вас возникнут какие-либо вопросы или
//         пожелания, не стесняйтесь обращаться к{' '}
//         <a target="_blank" rel="noreferrer" href="https://t.me/moraldown">
//           нам
//         </a>
//         .
//       </p>
//       {isDeliveryCheckbox ? (
//         <p>
//           Курьер свяжется с вами для уточнения деталей доставки в течении 15
//           минут. <br />
//           Спасибо за ваше терпение и понимание!
//         </p>
//       ) : (
//         <p>
//           Не забудьте взять с собой удобную сумку или контейнер для переноски
//           еды. Мы ждем вас и надеемся, что вы останетесь довольны нашим
//           обслуживанием. <br />
//           Спасибо за ваш заказ!
//         </p>
//       )}
//     </div>
//   );
// };

const OrderContent = ({ goBack, isDeliveryCheckbox }) => {
  return (
    <div className={cl['delivery__completed']}>
      <div className={cl['delivery__content-header']}>
        <h3 className={cl['delivery__content-header-title']}>
          Спасибо за заказ!
        </h3>
        <button
          onClick={goBack}
          className={cl['delivery__content-header-close']}
        />
      </div>
      <p>
        Мы рады, что вы выбрали нас. Надеемся, что ваш заказ принесет вам
        удовольствие и наслаждение. Если у вас возникнут какие-либо вопросы или
        пожелания, не стесняйтесь обращаться к{' '}
        <a target="_blank" rel="noreferrer" href="https://t.me/moraldown">
          нам
        </a>
        .
      </p>
      {isDeliveryCheckbox ? (
        <p>
          Курьер свяжется с вами для уточнения деталей доставки в течении 15
          минут. <br />
          Спасибо за ваше терпение и понимание!
        </p>
      ) : (
        <p>
          Не забудьте взять с собой удобную сумку или контейнер для переноски
          еды. Мы ждем вас и надеемся, что вы останетесь довольны нашим
          обслуживанием. <br />
          Спасибо за ваш заказ!
        </p>
      )}
    </div>
  );
};

const DeliveryContent = ({
  goBack,
  handleSubmit,
  phone,
  setPhone,
  isDeliveryCheckbox,
  setIsDeliveryCheckbox,
  formAddress,
  animationEndAddress,
}) => {
  return (
    <div className={cl['delivery__content']}>
      <div className={cl['delivery__content-header']}>
        <h2 className={cl['delivery__content-header-title']}>Доставка</h2>
        <button
          onClick={goBack}
          className={cl['delivery__content-header-close']}
        />
      </div>
      <form onSubmit={handleSubmit} className={cl['delivery__content-form']}>
        <input type="text" placeholder="Ваше имя" name="name" required />
        <Input
          placeholder="Телефон"
          value={phone}
          onChange={setPhone}
          name="phone"
          required
        />
        <div className={cl['delivery__content-form-checkbox']}>
          {[
            { name: 'pickup', text: 'Самовывоз', isDel: false },
            { name: 'delivery', text: 'Доставка', isDel: true },
          ].map(({ name, text, isDel }) => (
            <label key={name}>
              <input
                name={name}
                type="checkbox"
                readOnly
                checked={isDel ? isDeliveryCheckbox : !isDeliveryCheckbox}
                onClick={() => setIsDeliveryCheckbox(isDel)}
              />
              {text}
            </label>
          ))}
        </div>
        <div
          ref={formAddress}
          className={cl['delivery__content-form-address']}
          onAnimationEnd={animationEndAddress}
        >
          <input
            type="text"
            name="address"
            placeholder="Улица, дом, квартира"
            required={isDeliveryCheckbox ? true : false}
          />
          <div className={cl['delivery__content-form-address-row']}>
            <input type="text" name="storey" placeholder="Этаж" />
            <input type="text" name="domofon" placeholder="Домофон" />
          </div>
        </div>
        <input
          type="submit"
          className={cl['delivery__content-form-add']}
          value="Оформить"
        />
      </form>
    </div>
  );
};

export const DeliveryModal = () => {
  const [isDeliveryCheckbox, setIsDeliveryCheckbox] = useState(true),
    [isCompletedOrder, setIsCompletedOrder] = useState(false),
    [phone, setPhone] = useState(),
    { category } = useParams(),
    formAddress = useRef(),
    navigate = useNavigate();

  const goBack = e => {
    e.target.closest('#delivery-wrap').classList.add(cl['animation-close']);
  };

  const animationEndBasket = e => {
    switch (e.animationName) {
      case cl.delete:
        navigate(`/menu/${category}`);
        break;
      case cl.open:
        e.target.classList.remove(cl['animation-open']);
        break;
    }
  };
  const animationEndAddress = e => {
    e.stopPropagation();
    if (e.animationName === cl.delete) {
      formAddress.current.classList.add(
        cl['delivery__content-form-address_close'],
      );
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const response = {
      person: e.target?.name?.value,
      phone: e.target?.phone?.value,
      method: isDeliveryCheckbox ? 'delivery' : 'pickup',
    };
    if (isDeliveryCheckbox) {
      if (e.target?.address?.value) response.address = e.target.address.value;
      if (e.target?.domofon?.value) response.domofon = e.target.domofon?.value;
      if (e.target?.storey?.value) response.storey = e.target.storey?.value;
    }

    setIsCompletedOrder(true);
    console.log(response);
  };

  useEffect(() => {
    const f = formAddress.current.classList;
    if (isDeliveryCheckbox) {
      f.remove(
        cl['animation-close'],
        cl['delivery__content-form-address_close'],
      );
      f.add(cl['animation-open']);
    } else {
      f.remove(cl['animation-open']);
      f.add(cl['animation-close']);
    }
  }, [isDeliveryCheckbox]);
  return (
    <div
      onAnimationEnd={animationEndBasket}
      id="delivery-wrap"
      className={`${cl['delivery-wrap']} ${cl['animation-open']}`}
    >
      <div className={cl.delivery}>
        <div className={cl['delivery__label']}>
          {[1, 2, 3].map(i => (
            <img key={i} src={donut} alt="donut" />
          ))}
        </div>
        {isCompletedOrder ? (
          <OrderContent {...{ goBack, isDeliveryCheckbox }} />
        ) : (
          <DeliveryContent
            {...{
              goBack,
              handleSubmit,
              phone,
              setPhone,
              isDeliveryCheckbox,
              setIsDeliveryCheckbox,
              formAddress,
              animationEndAddress,
            }}
          />
        )}
      </div>
    </div>
  );
};
