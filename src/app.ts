
import { Config } from './config/config';
import { RequestService } from './services/request-service';
import { StateValidatorService } from './services/state-validator-service';

function getStateInput(): Promise<string> {

    return new Promise((resolve, reject) => {
        process.stdout.write("Enter a state you would like to find a brewery in: ");
        process.stdin.once("data", (data) => {
            const input = data.toString().trim()
            if (input == "") {
                reject(new Error("State input cannot be blank"))
            } else {
                resolve(input)
            }
    
            process.stdin.pause();
        });
    });

}

async function main() {

    try {
        // get state input from user
        const state = await getStateInput()

        const validator = new StateValidatorService();

        if (!validator.validateState(state)) {
            console.log(`Invalid state input: ${state}`)
            process.exit(1);
        }

        const config = new Config();

        console.log(`Picking a brewery in ${state} to try`);
        const requestService = new RequestService(config);
    
        const response = await requestService.getBreweriesByState(state);
        console.log("response: ", response.data)

    } catch (error) {
        console.log("Error", error)
        process.exit(1)
    }
}

main()
    .then(() => {
        console.log("Done!")
        process.exit(0)
    })