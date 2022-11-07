import Login, { validateEmail } from "../Login";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

const onSubmit = jest.fn();


describe("Test the Login Component", ()=> {
    test("render the Login form with 2 button", async()=> {
        render(<Login/>);
        const buttonList = await screen.findAllByRole("button")
        expect(buttonList).toHaveLength(2);
    });

    test("should failed on email validation", ()=> {
        const testEmail = "hello@gmail.com";
        expect(validateEmail(testEmail)).toBe(true);
    })

    test("email input field should accept email", ()=> {
        render(<Login/>);
        const email= screen.getByPlaceholderText("Enter email");
        userEvent.type(email, "sumeyye");
        expect(email.value).not.toMatch("sumeyye@gmail.com")
    })

    test("passport input should have type password", ()=> {
        render(<Login/>);
        const password= screen.getByPlaceholderText("Password");
        expect(password).toHaveAttribute("type" , "password")
    });

    test("should display alert if error", () => {
        render(<Login />);
        const email = screen.getByPlaceholderText("Enter email");
        const password = screen.getByPlaceholderText("Password");
        const buttonList = screen.getAllByRole("button");
    
        userEvent.type(email, "sumeyye");
        userEvent.type(password, "123456");
        userEvent.click(buttonList[0]);
        const error = screen.getByText("Email is not valid");
        expect(error).toBeInTheDocument();
      });

    test("should be able to reset the form", ()=> {
        const {getByTestId} = render (<Login />);
        const resetBtn = getByTestId("reset")
        const emailInputNode = screen.getByPlaceholderText("Enter email")
        const passwordInputNode = screen.getByPlaceholderText("Password");
        
        fireEvent.click(resetBtn);
        expect(emailInputNode.value).toMatch("");
        expect(passwordInputNode.value).toMatch("");
    })
    
    test("should be able to submit the form", ()=> {
        const component = render(<Login />);
    const email = screen.getByPlaceholderText("Enter email");
    const password = screen.getByPlaceholderText("Password");
    const btnList = screen.getAllByRole("button");

    userEvent.type(email, "sumeyye@gmail.com");
    userEvent.type(password, "123456");
    userEvent.click(btnList[0]);

    const user = screen.getByText("sumeyye@gmail.com");
    expect(user).toBeInTheDocument();
    })

})