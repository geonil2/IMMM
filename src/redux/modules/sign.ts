// 액션 타입 선언
const SIGNIN = 'sign/SIGNIN' as const;

// 액션 생성함수 선언
export const signIn = () => ({
    type: SIGNIN
});

// 모든 액션 겍체들에 대한 타입을 준비해줍니다.
// ReturnType<typeof _____> 는 특정 함수의 반환값을 추론해줍니다
// 상단부에서 액션타입을 선언 할 떄 as const 를 하지 않으면 이 부분이 제대로 작동하지 않습니다.
type signAction = ReturnType<typeof signIn>;