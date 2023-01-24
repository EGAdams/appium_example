class FormFiller {
	constructor( client ) {
		this.client = client;
	}

	async fillAndSubmitRegistrationForm ( firstName, lastName, email, password ) {
		await this.client.switchContext( contexts[ 0 ] ); // switch to native context
		const first_name = await this.client.$( '//*[@resource-id="com.awm.mcba.floridascarwash:id/field_fname"]' );
		await first_name.setValue( firstName );
		const last_name = await this.client.$( '//*[@resource-id="com.awm.mcba.floridascarwash:id/field_lname"]' );
		await last_name.setValue( lastName );
		const form_email = await this.client.$( '//*[@resource-id="com.awm.mcba.floridascarwash:id/field_email"]' );
		await form_email.setValue( email );
		const form_password = await this.client.$( '//*[@resource-id="com.awm.mcba.floridascarwash:id/field_password"]' );
		await form_password.setValue( password );
		const confirm_password = await this.client.$( '//*[@resource-id="com.awm.mcba.floridascarwash:id/field_confirm_password"]' );
		await confirm_password.setValue( password );
		// click button with id "email_create_account_button"
		const create_account_button = await this.client.$( '//*[@resource-id="com.awm.mcba.floridascarwash:id/email_create_account_button"]' );
		await create_account_button.click();
	}
}

