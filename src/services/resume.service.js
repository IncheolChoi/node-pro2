export class ResumesService {
  constructor(resumesRepository) {
    this.resumesRepository = resumesRepository;
  }

  //이력서 생성//
  createResume = async (userId, title, comment) => {
    // 저장소(Repository)에게 데이터를 요청합니다.
    const createdResume = await this.resumesRepository.createResume(
      userId,
      title,
      comment
    );

    // 비즈니스 로직을 수행한 후 사용자에게 보여줄 데이터를 가공합니다.
    return {
      resumeId: createdResume.resumeId,
      title: createdResume.title,
      comment: createdResume.comment,
      createdAt: createdResume.createdAt,
    };
  };

  //이력서 조회//
  findAllResumes = async () => {
    // 저장소(Repository)에게 데이터를 요청합니다.
    const resumes = await this.resumesRepository.findAllResumes();

    // 호출한 Resume들을 가장 최신 게시글 부터 정렬합니다.
    resumes.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    // 비즈니스 로직을 수행한 후 사용자에게 보여줄 데이터를 가공합니다.
    return resumes.map((resume) => {
      return {
        resumeId: resume.postId,
        title: resume.title,
        //   status: resume.status,
        createdAt: resume.createdAt,
      };
    });
  };

  //이력서 상세 조회//
  findResumeById = async (resumeId) => {
    // 저장소(Repository)에게 특정 이력서 하나를 요청합니다.
    const resume = await this.resumesRepository.findResumeById(resumeId);

    return {
      resumeId: resume.postId,
      title: resume.title,
      // status: resume.status,
      createdAt: resume.createdAt,
    };
  };

  //이력서 수정//
  updateResume = async (resumeId, title, comment) => {
    // 저장소(Repository)에게 특정 이력서 하나를 요청합니다.
    const resume = await this.resumesRepository.findResumeById(resumeId);
    if (!resume) throw new Error("존재하지 않는 이력서입니다.");

    // 저장소(Repository)에게 데이터 수정을 요청합니다.
    await this.resumesRepository.updateResume(resumeId, title, comment);

    // 변경된 데이터를 조회합니다.
    const updatedResume = await this.resumesRepository.findResumeById(resumeId);

    return {
      resumeId: updatedResume.resumeId,
      title: updatedResume.title,
      comment: updatedResume.comment,
      // status: updatedResume.status,
      createdAt: updatedResume.createdAt,
    };
  };

  //이력서 삭제//
  deleteResume = async (resumeId) => {
    // 저장소(Repository)에게 특정 이력서 하나를 요청합니다.
    const resume = await this.resumesRepository.findResumeById(resumeId);
    if (!resume) throw new Error("존재하지 않는 이력서입니다.");

    // 저장소(Repository)에게 데이터 삭제를 요청합니다.
    await this.resumesRepository.deleteResume(resumeId);

    return {
      resumeId: resume.postId,
      title: resume.title,
      createdAt: resume.createdAt,
    };
  };
}
