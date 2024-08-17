const { User } = require("../../../models/index");
const { successResponse, errorResponse } = require("../../../utils/response");
const {
  ReasonPhrases,
  StatusCodes,
  getStatusCode,
} = require("http-status-codes");
const { Op } = require("sequelize");
const { string, object } = require("yup");
module.exports = {
  index: async (req, res) => {
    try {
      const {
        _sort = "id",
        _order = "desc",
        q,
        _limit = "2",
        _page = "1",
      } = req.query;
      const where = {};
      if (q) {
        where.fullname = { [Op.iLike]: `%${q}%` };
      }
      const xApiKey = req.headers["x-api-key"];
      if (!xApiKey || xApiKey !== "key") {
        const errors = new Error("Unauthorized");
        errors.status = StatusCodes.UNAUTHORIZED;
        throw errors;
      }
      const offset = (_page - 1) * _limit;
      const { count, rows: users } = await User.findAndCountAll({
        order: [[_sort, _order]],
        where,
        limit: _limit,
        offset,
      });
      return successResponse(
        res,
        users,
        { total: count, current_page: +_page, per_page: +_limit },
        StatusCodes.OK,
        ReasonPhrases.OK
      );
    } catch (error) {
      if (error.status === 401) {
        return errorResponse(
          res,
          error.message,
          error.status,
          ReasonPhrases.UNAUTHORIZED
        );
      }
      return errorResponse(
        res,
        error.message,
        StatusCodes.INTERNAL_SERVER_ERROR,
        ReasonPhrases.INTERNAL_SERVER_ERROR
      );
    }
  },
  store: async (req, res) => {
    try {
      const schema = object({
        fullname: string().required("ten pahi nhap").min(4, "tren 4 ky tu"),
        email: string()
          .email("email khong dung dinh dang")
          .required("email phai nhap")
          .test("checkEmail", "email bi trung", async (value) => {
            const user = await User.findOne({
              where: {
                email: value,
              },
            });
            return !user;
          }),
        password: string()
          .required("password bat buoc phai nhap")
          .min(6, "mat khau qua ngan"),
        status: string().test(
          "check-status",
          "tra thai khong hop le",
          (value) => {
            return value === "true" || value === "false";
          }
        ),
      });

      const body = await schema.validate(req.body, {
        abortEarly: false,
      });

      const user = await User.create(body);
      return successResponse(
        res,
        user,
        {},
        StatusCodes.CREATED,
        ReasonPhrases.CREATED
      );
    } catch (e) {
      if (e.errors) {
        const errors = Object.fromEntries(
          e.inner.map((err) => [err.path, err.message])
        );
        return errorResponse(
          res,
          errors,
          StatusCodes.BAD_REQUEST,
          ReasonPhrases.BAD_REQUEST
        );
      }
      return errorResponse(
        res,
        e.message,
        StatusCodes.INTERNAL_SERVER_ERROR,
        ReasonPhrases.INTERNAL_SERVER_ERROR
      );
    }
  },
  update: async (req, res) => {
    const method = req.method;
    if (method === "PUT") {
      try {
        const { id } = req.params;
        const body = {
          fullname: null,
          email: null,
          password: null,
          status: null,

          ...req.body,
        };
        if (req.body) {
          const schema = object({
            fullname: string().required("Tên bắt buộc phải nhập"),
            email: string()
              .email("Email không đúng định dạng")
              .required("Email bắt buộc phải nhập")
              .test("checkEmail", "Email bị trùng", async (value) => {
                const user = await User.findOne({
                  where: {
                    email: value,
                  },
                });
                return !user;
              }),
            password: string()
              .required("Password bắt buộc phải nhập")
              .min(6, "Mật khẩu quá ngắn"),
            status: string().test(
              "check-status",
              "Trạng thái không hợp lệ",
              (value) => {
                return value === "true" || value === "false";
              }
            ),
          });
          const body = await schema.validate(req.body, { abortEarly: false });
        }

        const status = await User.update(body, { where: { id } });
        console.log(status);

        if (status < 1) {
          const errors = new Error("NOT_FOUND");
          errors.status = StatusCodes.NOT_FOUND;
          throw errors;
        }
        return successResponse(
          res,
          status,
          {},
          StatusCodes.OK,
          ReasonPhrases.OK
        );
      } catch (e) {
        if (e.status === 404) {
          return errorResponse(
            res,
            e.message,
            StatusCodes.NOT_FOUND,
            ReasonPhrases.NOT_FOUND
          );
        }
        // validate error
        if (e.errors) {
          const errors = Object.fromEntries(
            e.inner.map((err) => [err.path, err.message])
          );

          return errorResponse(
            res,
            errors,
            StatusCodes.BAD_REQUEST,
            ReasonPhrases.BAD_REQUEST
          );
        }

        // server error
        return errorResponse(
          res,
          e.message,
          StatusCodes.INTERNAL_SERVER_ERROR,
          ReasonPhrases.INTERNAL_SERVER_ERROR
        );
      }
    }
    if (method === "PATCH") {
      try {
        const { id } = req.params;
        const body = req.body;
        if (body) {
          const schema = object({
            fullname: string().required("Tên bắt buộc phải nhập"),
            email: string()
              .email("Email không đúng định dạng")
              .required("Email bắt buộc phải nhập")
              .test("checkEmail", "Email bị trùng", async (value) => {
                const user = await User.findOne({
                  where: {
                    email: value,
                  },
                });
                return !user;
              }),
            password: string()
              .required("Password bắt buộc phải nhập")
              .min(6, "Mật khẩu quá ngắn"),
            status: string().test(
              "check-status",
              "Trạng thái không hợp lệ",
              (value) => {
                return value === "true" || value === "false";
              }
            ),
          });
          const body = await schema.validate(req.body, {
            abortEarly: false,
          });
        }
        const status = await User.update(body, { where: { id } });
        if (status < 1) {
          const errors = new Error("NOT_FOUND");
          errors.status = StatusCodes.NOT_FOUND;
          throw errors;
        }
        return successResponse(
          res,
          status,
          {},
          StatusCodes.OK,
          ReasonPhrases.OK
        );
      } catch (e) {
        if (e.status === 404) {
          return errorResponse(
            res,
            e.message,
            StatusCodes.NOT_FOUND,
            ReasonPhrases.NOT_FOUND
          );
        }
        // validate error
        if (e.errors) {
          const errors = Object.fromEntries(
            e.inner.map((err) => [err.path, err.message])
          );

          return errorResponse(
            res,
            errors,
            StatusCodes.BAD_REQUEST,
            ReasonPhrases.BAD_REQUEST
          );
        }

        // server error
        return errorResponse(
          res,
          e.message,
          StatusCodes.INTERNAL_SERVER_ERROR,
          ReasonPhrases.INTERNAL_SERVER_ERROR
        );
      }
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const status = await User.destroy({ where: { id } });
      console.log(status);
      if (status < 1) {
        const errors = new Error("NOT_FOUND");
        errors.status = StatusCodes.NOT_FOUND;
        throw errors;
      }

      return successResponse(res, status, {}, StatusCodes.OK, ReasonPhrases.OK);
    } catch (e) {
      if (e.errors) {
        const errors = Object.fromEntries(
          e.inner.map((err) => [err.path, err.message])
        );
        return errorResponse(
          res,
          errors,
          StatusCodes.BAD_REQUEST,
          ReasonPhrases.BAD_REQUEST
        );
      }
      if (e.status === 404) {
        return errorResponse(
          res,
          e.message,
          StatusCodes.NOT_FOUND,
          ReasonPhrases.NOT_FOUND
        );
      }
      return errorResponse(
        res,
        e.message,
        StatusCodes.INTERNAL_SERVER_ERROR,
        ReasonPhrases.INTERNAL_SERVER_ERROR
      );
    }
  },
  deletes: async (req, res) => {
    try {
      const { ids } = req.body;

      const status = await User.destroy({
        where: {
          id: {
            [Op.in]: ids,
          },
        },
      });

      if (!ids || !Array.isArray(ids) || !ids.length || status < 1) {
        const errors = new Error("NOT_FOUND");
        errors.status = StatusCodes.NOT_FOUND;
        throw errors;
      }

      return successResponse(res, status, {}, StatusCodes.OK, ReasonPhrases.OK);
    } catch (e) {
      if (e.status === 404) {
        return errorResponse(
          res,
          e.message,
          StatusCodes.NOT_FOUND,
          ReasonPhrases.NOT_FOUND
        );
      }
      return errorResponse(
        res,
        e.message,
        StatusCodes.INTERNAL_SERVER_ERROR,
        ReasonPhrases.INTERNAL_SERVER_ERROR
      );
    }
  },
};
