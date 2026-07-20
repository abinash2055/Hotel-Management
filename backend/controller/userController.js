import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { User } from "../models/userSchema.js";
import { generateToken } from "../utils/jwtToken.js";
import cloudinary from "cloudinary";

// Patient Registration
export const patientRegister = catchAsyncErrors(async (req, res, next) => {
    const { firstName, lastName, email, phone, password, gender, dob, nic, role } = req.body;

    if (!firstName || !lastName || !email || !phone || !password || !gender || !dob || !nic || !role) {
        return next(new ErrorHandler("Please Provide Full Details....", 400))
    }

    let user = await User.findOne({ email });
    if (user) {
        return next(new ErrorHandler("User Already Registered....", 400))
    }

    user = await User.create({ firstName, lastName, email, phone, password, gender, dob, nic, role });

    generateToken(user, "User Registered Successfully....", 200, res);
});

// Patient Login
export const login = catchAsyncErrors(async (req, res, next) => {
    const { email, password, confirmPassword, role } = req.body;

    if (!email || !password || !confirmPassword || !role) {
        return next(new ErrorHandler("Please Provide all Details....", 400));
    }

    if (password !== confirmPassword) {
        return next(new ErrorHandler("Password and Confirm Password do not matched....", 400));
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new ErrorHandler("Invalid Password or Email....", 400));
    }

    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid Password or Email....", 400));
    }

    if (role !== user.role) {
        return next(new ErrorHandler("User with this role is not Found....", 400));
    }

    generateToken(user, "User Logged In Successfully....", 200, res);
});

// To add New Admin
export const addNewAdmin = catchAsyncErrors(async (req, res, next) => {
    const { firstName, lastName, email, phone, password, gender, dob, nic } = req.body;

    if (!firstName || !lastName || !email || !phone || !password || !gender || !dob || !nic) {
        return next(new ErrorHandler("Please Provide Full Details....", 400));
    }

    const isRegistered = await User.findOne({ email });
    if (isRegistered) {
        return next(new ErrorHandler(`${isRegistered.role} with this email already exists...`));
    }

    const admin = await User.create({ firstName, lastName, email, phone, password, gender, dob, nic, role: "Admin" });

    res.status(200).json({
        success: true,
        message: "New Admin Registered Successfully...."
    })
});

// To get all Doctors
export const getAllDoctors = catchAsyncErrors(async (req, res, next) => {
    const doctors = await User.find({ role: "Doctor" });
    res.status(200).json({
        success: true,
        doctors
    });
});

// To get all User Details
export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = req.user;
    res.status(200).json({
        success: true,
        user
    });
});

// To logout Admin only
export const logoutAdmin = catchAsyncErrors(async (req, res, next) => {
    res.status(200).cookie("adminToken", "", {
        httpOnly: true,
        expires: new Date(Date.now())
    }).json({
        success: true,
        message: "Admin Logged Out Successfully...."
    });
});

// To logout Patient only
export const logoutPatient = catchAsyncErrors(async (req, res, next) => {
    res.status(200).cookie("patientToken", "", {
        httpOnly: true,
        expires: new Date(Date.now())
    }).json({
        success: true,
        message: "Patient Logged Out Successfully...."
    });
});

// To Add New Doctors only
export const addNewDoctor = catchAsyncErrors(async (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("Doctor Avatar Required....", 400));
    }

    const { docAvatar } = req.files;
    const allowedFormats = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

    if (!allowedFormats.includes(docAvatar.mimetype)) {
        return next(new ErrorHandler("Files Format not Supported....", 400));
    }

    const { firstName, lastName, email, phone, password, gender, dob, nic, doctorDepartment } = req.body;

    if (!firstName || !lastName || !email || !phone || !password || !gender || !dob || !nic || !doctorDepartment) {
        return next(new ErrorHandler("Please Provide Full Details....", 400));
    }

    const isRegistered = await User.findOne({ email });
    if (isRegistered) {
        return next(new ErrorHandler(`${isRegistered.role} already registered with this email....`, 400));
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(docAvatar.tempFilePath);
    if (!cloudinaryResponse || cloudinaryResponse.error) {
        console.error("Cloudinary Error: ", cloudinaryResponse.error || "Unkown Cloudinary Error....")
    }

    const doctor = await User.create({
        firstName, lastName, email, phone, password, gender, dob, nic, doctorDepartment, role: "Doctor", docAvatar: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url
        }
    });
    res.status(200).json({
        success: true,
        message: "New Doctor Registered Successfully....",
        doctor
    });
});