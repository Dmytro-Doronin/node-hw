import {Request, Response} from "express";
import {deviceQuery} from "../repositories/queryRepositories/deviceQuery";
import {securityDevicesService} from "../services/securityDevices/securityDevices";
import {RequestWithParams} from "../types/commonBlogTypeAndPosts.types";
import {jwtService} from "../application/jwtService";

export const getAllDeviceController = async (req: Request, res: Response) => {

    const devices = await deviceQuery.getAllDevice()

    res.status(200).send(devices)
    return
}

export const deleteAllDevicesExcludeCurrentController = async (req: Request, res: Response) => {
    // const refreshToken = req.headers.cookie?.split('=')[1]
    // const {deviceId} = await jwtService.verifyToken(refreshToken!)
    const deviceId = req.tokenData.deviceId

    const result = await securityDevicesService.deleteAllDeviceExcludeCurrent(deviceId)

    if (!result) {
        res.sendStatus(404)
        return
    }

    res.sendStatus(204)
    return
}

export const deleteSpecifiedDevice = async (req: RequestWithParams<{deviceId: string}> , res: Response) => {

    // const refreshToken = req.headers.cookie?.split('=')[1]
    // const {currentDeviceId} = await jwtService.verifyToken(refreshToken!)
    const deviceIdToDelete = req.params.deviceId
    const currentDeviceId = req.tokenData.deviceId
    if (!deviceIdToDelete) {
        res.sendStatus(404)
        return
    }

    if (currentDeviceId !== deviceIdToDelete) {
        res.sendStatus(403)
        return
    }

    const result = await securityDevicesService.deleteDevice(deviceIdToDelete)

    if (!result) {
        res.sendStatus(404)
        return
    }

    res.sendStatus(204)
    return

}