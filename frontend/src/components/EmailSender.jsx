import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Editor } from '@tinymce/tinymce-react';
import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { sendEmail } from '../services/email.service';

function EmailSender() {
    const [emailData, setEmailData] = useState({
        to: '',
        subject: '',
        message: '',
    });

    const [sending, setSending] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    const editorRef = useRef(null);

    useEffect(() => {
        // Apply or remove dark mode class from the document element
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    async function handleFieldChange(event, name) {
        setEmailData({ ...emailData, [name]: event.target.value });
    }

    async function handleSubmit(event) {
        event.preventDefault();

        if (emailData.to === '' || emailData.subject === '' || emailData.message === '') {
            toast.error('Invalid Fields!');
            return;
        }

        try {
            setSending(true);
            await sendEmail(emailData);
            toast.success('Email Sent Successfully!');
            setEmailData({
                to: '',
                subject: '',
                message: '',
            });
            setTimeout(() => {
                editorRef.current.setContent('');
            }, 0);
        } catch (error) {
            console.error(error);
            toast.error('Email not Sent!');
        } finally {
            setSending(false);
        }
    }

    function handleClear() {
        setEmailData({
            to: '',
            subject: '',
            message: '',
        });
        // Use setTimeout to ensure the TinyMCE editor content is cleared after state update
        setTimeout(() => {
            editorRef.current.setContent('');
        }, 0);
    }

    function toggleTheme() {
        setIsDarkMode(!isDarkMode);
    }

    return (
        <div className="w-full min-h-screen flex justify-center items-center">
            <div className="md:w-3/5 p-4 mx-4 rounded border shadow bg-white dark:bg-gray-900">
                <div className="flex justify-between items-center">
                    <h1 className="text-gray-900 text-2xl">
                        <span className="font-bold text-yellow-700 text-3xl dark:text-yellow-200">Emailify</span>
                    </h1>
                    <button
                        onClick={toggleTheme}
                        className="bg-gray-800 text-white dark:bg-gray-200 dark:text-gray-800 px-3 py-2 m-1 rounded-full flex items-center"
                    >
                        <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
                    </button>
                </div>
                <p className="text-gray-700 dark:text-gray-200 text-2xl font-semibold">
                    Streamline Your Email Experience
                </p>
                <form onSubmit={handleSubmit}>
                    <div className="input_field mt-4">
                        <label htmlFor="to-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            To whom you want to send email:
                        </label>
                        <input
                            value={emailData.to}
                            onChange={(event) => handleFieldChange(event, 'to')}
                            type="email"
                            id="to-input"
                            className="block w-full p-2 mb-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Enter receiver mail id here...."
                        />

                        <label htmlFor="subject-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Subject of your email:
                        </label>
                        <input
                            value={emailData.subject}
                            onChange={(event) => handleFieldChange(event, 'subject')}
                            type="text"
                            id="subject-input"
                            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Enter the subject here...."
                        />
                    </div>
                    <div className="form-field mt-4">
                        <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Your message
                        </label>
                        <Editor
                            onInit={(evt, editor) => editorRef.current = editor}
                            onEditorChange={() => setEmailData({ ...emailData, message: editorRef.current.getContent() })}
                            apiKey="sqtaiyrjl4asp9gqggps5t7f5p0ocjleo79e95a4ixnsruha"
                            init={{
                                height: 200,
                                plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown',
                                toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                                tinycomments_mode: 'embedded',
                                tinycomments_author: 'Author name',
                                mergetags_list: [
                                    { value: 'First.Name', title: 'First Name' },
                                    { value: 'Email', title: 'Email' },
                                ],
                                ai_request: (request, respondWith) => respondWith.string(() => Promise.reject('See docs to implement AI Assistant')),
                            }}
                        />
                    </div>
                    {sending && (
                        <div role="status" className="flex m-5 justify-center items-center">
                            <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.9523 9.48836 51.9217 9.47771 55.8356 10.0802C60.8056 10.8212 65.6184 12.643 70.0006 15.4645C74.3829 18.286 78.2523 22.0581 81.3613 26.5766C83.676 29.7884 85.3635 33.3042 86.3564 36.9635C87.0595 39.3369 89.5422 40.7584 91.9676 40.1205Z" fill="currentFill" />
                            </svg>
                            <span className="sr-only">Loading...</span>
                        </div>
                    )}
                    <div className="buttons flex justify-between mt-5">
                        <button
                            type="submit"
                            disabled={sending}
                            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md disabled:opacity-50"
                        >
                            Send Email
                        </button>
                        <button
                            type="button"
                            onClick={handleClear}
                            disabled={sending}
                            className="px-4 py-2 bg-red-600 text-white font-semibold rounded-md disabled:opacity-50"
                        >
                            Clear
                        </button>
                    </div>
                </form>
                <h1 className='text-gray-500 flex justify-center dark:text-white'>Created by Tushar &#169;Emailify</h1>
            </div>
        </div>
    );
}

export default EmailSender;
