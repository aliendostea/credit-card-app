import { useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import useHttp from "../../../hooks/use-http";
import { CreditCard } from "../../UI/creditCard/CreditCard";
import Button from "../../UI/button/Button";
import modalStyle from "../../UI/modal/Modal.module.scss";
import Card from "../../UI/card/Card";
import LoaderDotsTwo from "../../UI/loaderDotsTwo/LoaderDotsTwo";
import Modal from "../../UI/modal/Modal";
import Select from "../../UI/select/Select";
import Textfield from "../../UI/textField/Textfield";
import { validationSchema } from "../../../validationSchema/validationSchema";
import style from "./Home.module.scss";

const initialValues = {
  fullName: "",
  cardNumber: "",
  expirationMonth: "",
  expirationYear: "",
  cvv: "",
};

const selectOptionsArrayMonth = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];

const selectOptionsArrayYear = [
  "2022",
  "2023",
  "2024",
  "2025",
  "2026",
  "2027",
  "2028",
];

interface resTypes {
  success?: boolean;
}

const creditcardAPI = "http://localhost:3100/data-creditcard";

const Home = () => {
  const { isLoading, sendRequest: fetchData, error } = useHttp();
  const [isSubmittedData, setIsSubmittedData] = useState(false);
  const [IsModalActive, setIsModalActive] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const { values, handleChange, handleSubmit, handleBlur, touched, errors } =
    useFormik({
      initialValues,
      onSubmit: (values) => {
        const setData = (res: resTypes | undefined) => {
          if (res?.success === false) return;

          setIsSubmittedData(true);
        };

        fetchData(
          {
            url: creditcardAPI,
            method: "POST",
            body: values,
          },
          setData
        );
      },
      validationSchema,
    });
  const handleOnMouseDown = (e: any) => {
    if (modalRef.current?.contains(e.target)) return;
    setIsModalActive(false);
  };

  const handleClickModalClose = () => {
    setIsModalActive(false);
  };

  useEffect(() => {
    if (isSubmittedData === false && isLoading === false) return;
    if (isSubmittedData === false && isLoading) return;

    const timeout = setTimeout(() => {
      setIsModalActive(true);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [isSubmittedData, isLoading]);

  return (
    <Card>
      <div className={style.home}>
        <CreditCard
          fullName={values.fullName}
          cardNumber={values.cardNumber}
          expirationMonth={values.expirationMonth}
          expirationYear={values.expirationYear}
          cvv={values.cvv}
        />

        <form
          className={style["form"]}
          onSubmit={handleSubmit}
          aria-label="form"
        >
          <Textfield
            id="fullName"
            name="fullName"
            type="text"
            value={values.fullName}
            placeholder="Your fullname"
            label="Fullname"
            onBlur={handleBlur}
            touched={touched.fullName}
            error={errors?.fullName}
            onChange={handleChange}
          />
          <Textfield
            id="cardNumber"
            name="cardNumber"
            type="text"
            value={values.cardNumber}
            placeholder="Card Number"
            label="Card number"
            onBlur={handleBlur}
            touched={touched.cardNumber}
            error={errors?.cardNumber}
            onChange={handleChange}
          />
          <Select
            id="expirationMonth"
            name="expirationMonth"
            type="text"
            value={values.expirationMonth}
            label="Expiration month"
            optionsArray={selectOptionsArrayMonth}
            placeholder="Select month"
            onBlur={handleBlur}
            touched={touched.expirationMonth}
            error={errors?.expirationMonth}
            onChange={handleChange}
          />
          <Select
            id="expirationYear"
            name="expirationYear"
            type="text"
            value={values.expirationYear}
            label="Expiration year"
            optionsArray={selectOptionsArrayYear}
            placeholder="Select Year"
            onBlur={handleBlur}
            touched={touched.expirationYear}
            error={errors?.expirationYear}
            onChange={handleChange}
          />
          <Textfield
            id="cvv"
            name="cvv"
            type="text"
            value={values.cvv}
            placeholder="CVV"
            label="CVV"
            onBlur={handleBlur}
            touched={touched.cvv}
            error={errors?.cvv}
            onChange={handleChange}
          />

          {isSubmittedData === false && isLoading === false && (
            <Button label="Submit" iconType="add_card" />
          )}
          {isSubmittedData && isLoading === false && (
            <Button
              label="Submitted"
              theme="green"
              iconType="done"
              disabled={true}
            />
          )}

          {isLoading && error === null && (
            <Button disabled={true}>
              <LoaderDotsTwo />
            </Button>
          )}
          {error && (
            <Button
              label="Connection Error"
              theme="red"
              iconType="error"
              disabled={true}
            />
          )}
          {error && (
            <span className={style["form-span-error"]}>
              Connection error, try again later...
            </span>
          )}
        </form>
        {IsModalActive && (
          <Modal>
            <div
              className={modalStyle["modal-parent"]}
              onMouseDown={handleOnMouseDown}
            >
              <div ref={modalRef} className={modalStyle["modal"]}>
                <div className={modalStyle["modal-body"]}>
                  <Button
                    iconType="close"
                    btnType="btn2"
                    onClick={handleClickModalClose}
                  />
                  <span className="material-symbols-rounded">celebration</span>
                  <span className={modalStyle["modal-title"]}>
                    Congratulations!
                  </span>
                  <p className={modalStyle["modal-p"]}>
                    Dear Sir/Madam {values.fullName}, <br />
                    your credit card has been successfully created.
                  </p>
                </div>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </Card>
  );
};

export default Home;
