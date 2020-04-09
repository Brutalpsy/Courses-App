import React from "react";
import CourseForm from "./CourseForm";
import renderer from "react-test-renderer";
import { courses, authors } from "../../../tools/mockData";
import { isTSAnyKeyword, exportAllDeclaration } from "@babel/types";
import CoursesPage from "./CoursesPage";

it('sets submit button label "Saving1" when saving is true', () => {
  const tree = renderer.create(
    <CourseForm
      authors={authors}
      course={courses[0]}
      onSave={jest.fn()}
      onChange={jest.fn()}
      saving
    />
  );
  expect(tree).toMatchInlineSnapshot(`
    <form
      onSubmit={[MockFunction]}
    >
      <h2>
        Edit
         Course
      </h2>
      <div
        className="form-group"
      >
        <label
          htmlFor="title"
        >
          title
        </label>
        <div
          className="field"
        >
          <input
            className="form-control"
            name="title"
            onChange={[MockFunction]}
            type="text"
            value="Securing React Apps with Auth0"
          />
        </div>
      </div>
      <div
        className="form-group"
      >
        <label
          htmlFor="authorId"
        >
          Author
        </label>
        <div
          className="field"
        >
          <select
            className="form-control"
            name="authorId"
            onChange={[MockFunction]}
            value={1}
          >
            <option
              value=""
            />
            <option
              value={1}
            >
               
              Cory House
            </option>
            <option
              value={2}
            >
               
              Scott Allen
            </option>
            <option
              value={3}
            >
               
              Dan Wahlin
            </option>
          </select>
        </div>
      </div>
      <div
        className="form-group"
      >
        <label
          htmlFor="category"
        >
          category
        </label>
        <div
          className="field"
        >
          <input
            className="form-control"
            name="category"
            onChange={[MockFunction]}
            type="text"
            value="JavaScript"
          />
        </div>
      </div>
      <button
        className="btn btn-primary"
        disabled={true}
        type="submit"
      >
        Saving...
      </button>
    </form>
  `);
});

it('should  submit button label "Save" when saving is false', () => {
  const tree = renderer.create(
    <CourseForm
      authors={authors}
      course={courses[0]}
      onSave={jest.fn()}
      onChange={jest.fn()}
      saving={false}
    />
  );
  expect(tree).toMatchInlineSnapshot(`
    <form
      onSubmit={[MockFunction]}
    >
      <h2>
        Edit
         Course
      </h2>
      <div
        className="form-group"
      >
        <label
          htmlFor="title"
        >
          title
        </label>
        <div
          className="field"
        >
          <input
            className="form-control"
            name="title"
            onChange={[MockFunction]}
            type="text"
            value="Securing React Apps with Auth0"
          />
        </div>
      </div>
      <div
        className="form-group"
      >
        <label
          htmlFor="authorId"
        >
          Author
        </label>
        <div
          className="field"
        >
          <select
            className="form-control"
            name="authorId"
            onChange={[MockFunction]}
            value={1}
          >
            <option
              value=""
            />
            <option
              value={1}
            >
               
              Cory House
            </option>
            <option
              value={2}
            >
               
              Scott Allen
            </option>
            <option
              value={3}
            >
               
              Dan Wahlin
            </option>
          </select>
        </div>
      </div>
      <div
        className="form-group"
      >
        <label
          htmlFor="category"
        >
          category
        </label>
        <div
          className="field"
        >
          <input
            className="form-control"
            name="category"
            onChange={[MockFunction]}
            type="text"
            value="JavaScript"
          />
        </div>
      </div>
      <button
        className="btn btn-primary"
        disabled={false}
        type="submit"
      >
        Save
      </button>
    </form>
  `);
});
