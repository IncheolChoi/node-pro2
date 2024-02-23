// Resume의 컨트롤러(Controller)역할을 하는 클래스
export class ResumesController {
  constructor(resumesService) {
    this.resumesService = resumesService;
  }
  //이력서 생성//
  createResume = async (req, res, next) => {
    try {
      const { userId } = req.user;
      const { title, comment } = req.body;
      //   if (!nickname || !password || !title || !content)
      //   throw new Error('InvalidParamsError');

      // 서비스 계층에 구현된 createPost 로직을 실행합니다.å
      const createdResume = await this.resumesService.createResume(
        userId,
        title,
        comment
      );

      return res.status(201).json({ data: createdResume });
    } catch (err) {
      next(err);
    }
  };

  //이력서 조회//
  getResumes = async (req, res, next) => {
    try {
      // 서비스 계층에 구현된 findAllPosts 로직을 실행합니다.
      const resumes = await this.resumesService.findAllResumes();

      return res.status(200).json({ data: resumes });
    } catch (err) {
      next(err);
    }
  };

  //이력서 상세 조회//
  getResumeById = async (req, res, next) => {
    try {
      const { resumeId } = req.params;

      // 서비스 계층에 구현된 findPostById 로직을 실행합니다.
      const resume = await this.resumesService.findResumeById(resumeId);

      return res.status(200).json({ data: resume });
    } catch (err) {
      next(err);
    }
  };

  //이력서 수정//
  updateResume = async (req, res, next) => {
    try {
      const { resumeId } = req.params;
      const { title, comment } = req.body;

      // 서비스 계층에 구현된 updatePost 로직을 실행합니다.
      const updatedResume = await this.resumesService.updateResume(
        resumeId,
        title,
        comment
        // status,
      );

      return res.status(200).json({ data: updatedResume });
    } catch (err) {
      next(err);
    }
  };

  //이력서 삭제//
  deleteResume = async (req, res, next) => {
    try {
      const { resumeId } = req.params;

      // 서비스 계층에 구현된 deletePost 로직을 실행합니다.
      const deletedResume = await this.resumesService.deleteResume(resumeId);

      return res.status(200).json({ data: deletedResume });
    } catch (err) {
      next(err);
    }
  };
}
