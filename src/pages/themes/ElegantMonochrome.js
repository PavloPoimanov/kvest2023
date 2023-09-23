import React from 'react';

export const ElegantMonochrome = () => {
    return (
        <div className="container mx-auto my-8">
            {/* Buttons */}
            <div className="mb-8">
                <button className="bg-blue-gray text-white py-2 px-4 rounded-md mr-4 hover:bg-blue-gray-700">
                    Primary Button
                </button>
                <button className="bg-light-blue-gray text-white py-2 px-4 rounded-md hover:bg-light-blue-gray-700">
                    Secondary Button
                </button>
            </div>

            {/* Forms */}
            <div className="mb-8">
                <form className="bg-white p-4 rounded-lg shadow">
                    <div className="mb-4">
                        <label className="block text-blue-gray mb-2" htmlFor="name">
                            Name
                        </label>
                        <input
                            className="border border-blue-gray rounded-md px-3 py-2 w-full"
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Your Name"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-blue-gray mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="border border-blue-gray rounded-md px-3 py-2 w-full"
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Your Email"
                        />
                    </div>
                    <button className="bg-blue-gray text-white py-2 px-4 rounded-md hover:bg-blue-gray-700">
                        Submit
                    </button>
                </form>
            </div>

            {/* Lists */}
            <div>
                <ul className="list-disc list-inside">
                    <li className="text-blue-gray">List item 1</li>
                    <li className="text-blue-gray">List item 2</li>
                    <li className="text-blue-gray">List item 3</li>
                </ul>
                <ol className="list-decimal list-inside">
                    <li className="text-blue-gray">Numbered item 1</li>
                    <li className="text-blue-gray">Numbered item 2</li>
                    <li className="text-blue-gray">Numbered item 3</li>
                </ol>
            </div>

            {/* Switch */}
            <div className="mb-8">
                <h3 className="text-lg font-semibold text-blue-gray mb-2">Switch</h3>
                <label className="flex items-center">
                    <input type="checkbox" className="form-checkbox text-light-blue-gray" />
                    <span className="ml-2 text-blue-gray">Toggle me</span>
                </label>
            </div>

            {/* Checkboxes */}
            <div className="mb-8">
                <h3 className="text-lg font-semibold text-blue-gray mb-2">Checkboxes</h3>
                <div className="space-y-2">
                    <label className="flex items-center">
                        <input type="checkbox" className="form-checkbox text-light-blue-gray" />
                        <span className="ml-2 text-blue-gray">Option 1</span>
                    </label>
                    <label className="flex items-center">
                        <input type="checkbox" className="form-checkbox text-light-blue-gray" />
                        <span className="ml-2 text-blue-gray">Option 2</span>
                    </label>
                    <label className="flex items-center">
                        <input type="checkbox" className="form-checkbox text-light-blue-gray" />
                        <span className="ml-2 text-blue-gray">Option 3</span>
                    </label>
                </div>
            </div>

            {/* Radio Buttons */}
            <div>
                <h3 className="text-lg font-semibold text-blue-gray mb-2">Radio Buttons</h3>
                <div className="space-y-2">
                    <label className="flex items-center">
                        <input type="radio" className="form-radio text-light-blue-gray" name="radioGroup" />
                        <span className="ml-2 text-blue-gray">Option 1</span>
                    </label>
                    <label className="flex items-center">
                        <input type="radio" className="form-radio text-light-blue-gray" name="radioGroup" />
                        <span className="ml-2 text-blue-gray">Option 2</span>
                    </label>
                    <label className="flex items-center">
                        <input type="radio" className="form-radio text-light-blue-gray" name="radioGroup" />
                        <span className="ml-2 text-blue-gray">Option 3</span>
                    </label>
                </div>
            </div>
        </div>
    );
}

