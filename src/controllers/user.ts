import { NextFunction, Request, Response } from "express";
import * as XLSX from "xlsx";
import AppDataSource from "../db/config";
import { Message } from "../entities/Message";
import { messageListSchema } from "../utility/inputValidation";

const messageRep = AppDataSource.getRepository(Message);

export const importExcel = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data: { userId: number; message: string }[] =
      XLSX.utils.sheet_to_json(sheet);

    for (let item of data) {
      const newMessage = messageRep.create({
        message: item.message,
        userId: item.userId,
      });
      await messageRep.save(newMessage);
    }
    return res.status(200).json({
      success: true,
      message: "Data imported successfully",
      data,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      messahe: "Internal server error",
    });
  }
};

export const getMessageList = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // const { error, value } = messageListSchema.validate(req.body); // input validation
    // if (error) {
    //   res.status(400).json({
    //     success: false,
    //     message: error.details[0].message,
    //   });
    // }
    const page = parseInt(req.body.pageIndex as string) || 1;
    const limit = parseInt(req.body.pageSize as string) || 10;
    console.log(page, limit);
    console.log(req.body.pageIndex, req.body.pageSize);
    const skip = (page - 1) * limit;
    const [messages, totalMessages] = await messageRep.findAndCount({
      skip,
      take: limit,
    });
    const totalPages = Math.ceil(totalMessages / limit);

    res.status(200).json({
      success: true,
      page,
      limit,
      totalPages,
      totalMessages,
      messages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
