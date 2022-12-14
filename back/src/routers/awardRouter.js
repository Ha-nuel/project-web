import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { awardService } from "../services/awardService";
import {
  awardPostValidator,
  awardPatchValidator,
} from "../middlewares/awardValidator";

const awardRouter = Router();

//수상이력 추가
awardRouter.post(
  "/award",
  login_required,
  awardPostValidator(),
  async (req, res, next) => {
    try {
      const userId = req.currentUserId;
      const { title, description } = req.body;

      const newAward = await awardService.addAward({
        userId,
        title,
        description,
      });

      res.status(201).json(newAward);
    } catch (error) {
      next(error);
    }
  }
);

// 나의 수상이력 조회
awardRouter.get("/awards/:userId", login_required, async (req, res, next) => {
  try {
    const { userId } = req.params;
    const awards = await awardService.getAwards({
      userId,
    });

    res.status(200).json(awards);
  } catch (error) {
    next(error);
  }
});

// 나의 수상이력 편집, 업데이트
awardRouter.patch(
  "/award/:awardId",
  login_required,
  awardPatchValidator(),
  async (req, res, next) => {
    try {
      const userId = req.currentUserId;
      const { awardId } = req.params;
      const toUpdate = req.toUpdate;

      const updatedAward = await awardService.updateAward({
        userId,
        awardId,
        toUpdate,
      });

      res.status(200).json(updatedAward);
    } catch (error) {
      next(error);
    }
  }
);

//개별 수상이력 삭제
awardRouter.delete(
  "/award/:awardId",
  login_required,
  async (req, res, next) => {
    try {
      const userId = req.currentUserId;
      const { awardId } = req.params;

      const deletedCount = await awardService.deleteAward({
        userId,
        awardId,
      });

      res.status(200).json(deletedCount);
    } catch (error) {
      next(error);
    }
  }
);

export { awardRouter };
