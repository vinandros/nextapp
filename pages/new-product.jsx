import { css } from "@emotion/react";
import Router, { useRouter } from "next/router";
import { useState, useContext } from "react";
import Layout from "../components/layout/Layout";
import {
  Error,
  FormStyle,
  InputStyles,
  InputSubmit,
} from "../components/ui/Form";
import { FireBaseContext } from "../firebase";
import useValidation from "../hooks/useValidation";
import newProductVaslidations from "../validation/newProductVaslidations";
import FileUploader from "react-firebase-file-uploader";
import Error404 from "../components/layout/404";

const initialState = {
  name: "",
  company: "",
  image: "",
  url: "",
  description: "",
};

export default function NewProduct() {
  // Img============================================================
  const [imgUrl, setImgUrl] = useState("");

  // State ============================================================
  const [error, setError] = useState(false);
  //use validations and handle submit
  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    handleBlur,
    setSubmitForm,
  } = useValidation(initialState, newProductVaslidations, addNewProduct);
  const { name, company, url, description } = values;

  // Router============================================================
  const router = useRouter();

  // Firebase============================================================
  const { user, firebase } = useContext(FireBaseContext);

  // Add Product============================================================
  async function addNewProduct() {
    if (!user) {
      return router.push("/login");
    }

    const product = {
      name,
      company,
      url,
      image: imgUrl,
      description,
      likes: 0,
      comments: [],
      createdAt: Date.now(),
      createdBy: {
        id: user.uid,
        name: user.displayName,
      },
      likedBy: [],
    };

    console.log("adding product");

    try {
      await firebase.db.collection("products").add(product);
      Router.push("/");
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  }

  // hanleImage============================================================
  const handleUploadError = (error) => {
    console.log("error", error);
  };
  const handleUploadSuccess = (filename) => {
    console.log("Success");
    firebase
      .storage()
      .ref("products")
      .child(filename)
      .getDownloadURL()
      .then((url) => {
        console.log(url);
        setImgUrl(url);
      });
  };

  // Errors============================================================
  if (!user) {
    return (
      <Layout>
        <Error404 />
      </Layout>
    );
  }
  return (
    <Layout>
      <h1
        css={css`
          text-align: center;
          margin-top: 5rem;
        `}
      >
        Add new Product
      </h1>
      <FormStyle onSubmit={handleSubmit} noValidate>
        <fieldset>
          <legend>Basic information</legend>
          <InputStyles error={errors.name ? true : false}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Product name"
              onChange={handleChange}
              value={name}
              onBlur={handleBlur}
            />
          </InputStyles>
          {errors.name && <Error>{errors.name}</Error>}

          <InputStyles error={errors.company ? true : false}>
            <label htmlFor="company">Company name</label>
            <input
              type="text"
              name="company"
              id="company"
              placeholder="Company name"
              onChange={handleChange}
              value={company}
              onBlur={handleBlur}
            />
          </InputStyles>
          {errors.company && <Error>{errors.company}</Error>}

          <InputStyles error={errors.image ? true : false}>
            <label htmlFor="image">Image</label>
            <FileUploader
              accept="image/*"
              name="image"
              id="image"
              randomizeFilename
              storageRef={firebase.storage().ref("products")}
              onUploadSuccess={handleUploadSuccess}
              onUploadError={handleUploadError}
            />
          </InputStyles>
          {/* {errors.image && <Error>{errors.image}</Error>} */}

          <InputStyles error={errors.url ? true : false}>
            <label htmlFor="url">URL</label>
            <input
              type="url"
              name="url"
              id="url"
              placeholder="Your product url"
              onChange={handleChange}
              value={url}
              onBlur={handleBlur}
            />
          </InputStyles>
          {errors.url && <Error>{errors.url}</Error>}
        </fieldset>
        <fieldset>
          <legend>About Product</legend>
          <InputStyles error={errors.url ? true : false}>
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              onChange={handleChange}
              value={description}
              onBlur={handleBlur}
            />
          </InputStyles>
          {errors.description && <Error>{errors.description}</Error>}
        </fieldset>

        {error && <Error>{error}</Error>}
        <InputSubmit
          onClick={setSubmitForm}
          type="submit"
          value="Create Product"
        />
      </FormStyle>
    </Layout>
  );
}
